import { JsonSchemaFormSectionVariant } from '../../styled-system/recipes';

export const JSON_SCHEMA_FORM_ID_DELIMITER = '~~~';

/** determine the tree depth of a JsonSchemaForm section with the given sectionId */
export function calculateSectionDepth({ sectionId }: { sectionId: string }): number {
  return sectionId.split(JSON_SCHEMA_FORM_ID_DELIMITER).length - 1;
}

export function getVariantFromDepth(depth: number): JsonSchemaFormSectionVariant['depth'] {
  return depth % 2 === 0 ? 'even' : 'odd';
}
