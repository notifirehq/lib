import { EmailRenderOutput } from '@novu/shared';
import { z } from 'zod';
import { Injectable } from '@nestjs/common';
import { render } from '@maily-to/render';
import { FullPayloadForRender, RenderCommand } from './render-command';
import { ExpandEmailEditorSchemaUsecase } from './expand-email-editor-schema.usecase';

export class RenderEmailOutputCommand extends RenderCommand {}

@Injectable()
export class RenderEmailOutputUsecase {
  constructor(private expendEmailEditorSchemaUseCase: ExpandEmailEditorSchemaUsecase) {}

  async execute(renderCommand: RenderEmailOutputCommand): Promise<EmailRenderOutput> {
    const { emailEditor, subject } = EmailStepControlSchema.parse(renderCommand.controlValues);
    const expandedSchema = this.transformForAndShowLogic(emailEditor, renderCommand.fullPayloadForRender);
    const htmlRendered = await render(expandedSchema);

    return { subject, body: htmlRendered };
  }

  private transformForAndShowLogic(body: string, fullPayloadForRender: FullPayloadForRender) {
    return this.expendEmailEditorSchemaUseCase.execute({ emailEditorJson: body, fullPayloadForRender });
  }
}

export const EmailStepControlSchema = z
  .object({
    emailEditor: z.string(),
    subject: z.string(),
  })
  .strict();
