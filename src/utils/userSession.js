// appConfig.js
import { AppConfig, UserSession } from '@stacks/connect';

// Define and create the AppConfig instance
const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export default userSession;