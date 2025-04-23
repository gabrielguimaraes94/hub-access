
export const getWindowsUsername = async (): Promise<string | null> => {
  try {
    // Try to get username through activeX (IE/Edge specific)
    if ((window as any).ActiveXObject) {
      const network = new ActiveXObject('WScript.Network');
      return network.UserName;
    }

    // For modern browsers, attempt to get through environment
    return process.env.USERNAME || 
           process.env.USER || 
           null;
  } catch (error) {
    console.log('Unable to get Windows username:', error);
    return null;
  }
};
