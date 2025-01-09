/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { PreviewPayload, TipTapNode } from '@novu/shared';
import { processNodeAttrs, processNodeMarks } from '@novu/application-generic';

import { HydrateEmailSchemaCommand } from './hydrate-email-schema.command';
import { PlaceholderAggregation } from '../../../workflows-v2/usecases';

@Injectable()
export class HydrateEmailSchemaUseCase {
  execute(command: HydrateEmailSchemaCommand): {
    hydratedEmailSchema: TipTapNode;
    placeholderAggregation: PlaceholderAggregation;
  } {
    const placeholderAggregation: PlaceholderAggregation = {
      nestedForPlaceholders: {},
      regularPlaceholdersToDefaultValue: {},
    };

    // TODO: Aligned Zod inferred type and TipTapNode to remove the need of a type assertion
    const emailBody: TipTapNode = TipTapSchema.parse(JSON.parse(command.emailEditor)) as TipTapNode;
    if (emailBody) {
      this.transformContentInPlace([emailBody], command.fullPayloadForRender, placeholderAggregation);
    }

    return {
      hydratedEmailSchema: emailBody,
      placeholderAggregation,
    };
  }

  private variableLogic(
    node: TipTapNode & {
      attrs: { id: string };
    },
    content: TipTapNode[],
    index: number
  ) {
    content[index] = {
      type: 'text',
      text: node.attrs.id,
    };
  }

  private forNodeLogic(
    node: TipTapNode & {
      attrs: { each: string };
    },
    masterPayload: PreviewPayload,
    content: TipTapNode[],
    index: number,
    placeholderAggregation: PlaceholderAggregation
  ) {
    const itemPointerToDefaultRecord = this.collectAllItemPlaceholders(node);
    const resolvedValueForPlaceholder = this.getResolvedValueForPlaceholder(
      masterPayload,
      node,
      itemPointerToDefaultRecord,
      placeholderAggregation
    );
    content[index] = {
      type: 'for',
      attrs: { each: resolvedValueForPlaceholder },
      content: node.content,
    };
  }

  private transformContentInPlace(
    content: TipTapNode[],
    masterPayload: PreviewPayload,
    placeholderAggregation: PlaceholderAggregation
  ) {
    content.forEach((node, index) => {
      processNodeAttrs(node);
      processNodeMarks(node);

      if (this.isVariableNode(node)) {
        this.variableLogic(node, content, index);
      }
      if (this.isForNode(node)) {
        this.forNodeLogic(node, masterPayload, content, index, placeholderAggregation);
      }
      if (node.content) {
        this.transformContentInPlace(node.content, masterPayload, placeholderAggregation);
      }
    });
  }

  private isForNode(node: TipTapNode): node is TipTapNode & { attrs: { each: string } } {
    return !!(node.type === 'for' && node.attrs && 'each' in node.attrs && typeof node.attrs.each === 'string');
  }

  private isVariableNode(node: TipTapNode): node is TipTapNode & { attrs: { id: string } } {
    return !!(node.type === 'variable' && node.attrs && 'id' in node.attrs && typeof node.attrs.id === 'string');
  }

  private getResolvedValueForPlaceholder(
    masterPayload: PreviewPayload,
    node: TipTapNode & {
      attrs: { each: string };
    },
    itemPointerToDefaultRecord: Record<string, string>,
    placeholderAggregation: PlaceholderAggregation
  ) {
    let resolvedValueIfFound = this.getValueByPath(masterPayload, node.attrs.each);

    if (!resolvedValueIfFound) {
      resolvedValueIfFound = [
        this.buildElement(itemPointerToDefaultRecord, '1'),
        this.buildElement(itemPointerToDefaultRecord, '2'),
      ];
    }
    placeholderAggregation.nestedForPlaceholders[`{{${node.attrs.each}}}`] =
      this.buildNestedVariableRecord(itemPointerToDefaultRecord);

    return resolvedValueIfFound;
  }

  private buildNestedVariableRecord(itemPointerToDefaultRecord: Record<string, string>) {
    const transformedObj: Record<string, string> = {};

    Object.entries(itemPointerToDefaultRecord).forEach(([key, value]) => {
      transformedObj[value] = value;
    });

    return transformedObj;
  }
  private collectAllItemPlaceholders(nodeExt: TipTapNode) {
    const payloadValues = {};
    const traverse = (node: TipTapNode) => {
      if (node.type === 'for') {
        return;
      }
      if (this.isPayloadValue(node)) {
        const { id } = node.attrs;
        payloadValues[`${node.attrs.id}`] = node.attrs.fallback || `{{item.${id}}}`;
      }
      if (node.content && Array.isArray(node.content)) {
        node.content.forEach(traverse);
      }
    };
    nodeExt.content?.forEach(traverse);

    return payloadValues;
  }

  private getValueByPath(masterPayload: Record<string, any>, placeholderRef: string): any {
    const keys = placeholderRef.split('.');

    return keys.reduce((currentObj, key) => {
      if (currentObj && typeof currentObj === 'object' && key in currentObj) {
        return currentObj[key];
      }

      return undefined;
    }, masterPayload);
  }

  private buildElement(itemPointerToDefaultRecord: Record<string, string>, suffix: string) {
    const mockPayload: Record<string, any> = {};
    Object.keys(itemPointerToDefaultRecord).forEach((key) => {
      const keys = key.split('.');
      let current = mockPayload;
      keys.forEach((innerKey, index) => {
        if (!current[innerKey]) {
          current[innerKey] = {};
        }
        if (index === keys.length - 1) {
          current[innerKey] = itemPointerToDefaultRecord[key] + suffix;
        } else {
          current = current[innerKey];
        }
      });
    });

    return mockPayload;
  }

  private isPayloadValue(node: TipTapNode): node is { type: 'payloadValue'; attrs: { id: string; fallback?: string } } {
    return !!(node.type === 'payloadValue' && node.attrs && typeof node.attrs.id === 'string');
  }
}

export const TipTapSchema = z
  .object({
    type: z.string().optional(),
    content: z.array(z.lazy(() => TipTapSchema)).optional(),
    text: z.string().optional(),
    marks: z
      .array(
        z
          .object({
            type: z.string(),
            attrs: z.record(z.any()).optional(),
          })
          .passthrough()
      )
      .optional(),
    attrs: z.record(z.unknown()).optional(),
  })
  .passthrough();
