import labels from '../data/labels.json';

/**
 * Gets a label from the labels.json file using a dot-notation key path
 * @param keyPath - The key path in dot notation (e.g., "contacts.email")
 * @param defaultValue - The default value to return if the key is not found
 * @returns The label value
 */
export const getLabel = (keyPath: string, defaultValue: string = ''): string => {
  try {
    const keys = keyPath.split('.');
    let value: any = labels;
    
    for (const key of keys) {
      if (value && Object.prototype.hasOwnProperty.call(value, key)) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }
    
    return typeof value === 'string' ? value : defaultValue;
  } catch (error) {
    console.error(`Error getting label for key: ${keyPath}`, error);
    return defaultValue;
  }
};

export default getLabel; 