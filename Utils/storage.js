import * as Keychain from 'react-native-keychain';

export async function saveSecretKey(service, value) {
  console.log('KEY', service, value);
  try {
    await Keychain.setGenericPassword('_', value, {service});
    console.log('API key saved successfully');
  } catch (error) {
    console.error('Failed to save API key:', error);
  }
}

export async function getSecretKey(service) {
  try {
    const credentials = await Keychain.getGenericPassword({service});
    if (credentials) {
      return credentials.password;
    } else {
      console.log('No API key found');
      return null;
    }
  } catch (error) {
    console.error('Failed to retrieve API key:', error);
    return null;
  }
}
