
export const getWindowsUsername = async (): Promise<string | null> => {
  try {
    // Try to get username through activeX (IE/Edge specific)
    if (typeof ActiveXObject !== 'undefined') {
      const network = new ActiveXObject('WScript.Network');
      return network.UserName;
    }

    // For modern browsers in a Node.js environment
    if (typeof process !== 'undefined' && process.env) {
      return process.env.USERNAME || 
             process.env.USER || 
             null;
    }
    
    // If neither method works
    console.log('Windows username detection not available in this environment');
    return null;
  } catch (error) {
    console.log('Unable to get Windows username:', error);
    return null;
  }
};
