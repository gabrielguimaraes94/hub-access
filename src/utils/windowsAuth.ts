
export interface WindowsIdentity {
  username: string;
  domain: string | null;
}

export const getWindowsUsername = async (): Promise<string | null> => {
  try {
    // Tentativa 1: ActiveXObject (IE/Edge)
    if (typeof ActiveXObject !== 'undefined') {
      const network = new ActiveXObject('WScript.Network');
      return network.UserName;
    }
    
    // Tentativa 2: Ambiente Node.js
    if (typeof process !== 'undefined' && process.env) {
      return process.env.USERNAME || 
             process.env.USER || 
             null;
    }
    
    // Tentativa 3: via navegador moderno
    // Alguns navegadores corporativos têm extensões que expõem essa informação
    if (typeof navigator !== 'undefined') {
      // @ts-ignore - Alguns navegadores corporativos podem ter esta propriedade
      if (navigator.userAgent && navigator.userAgent.indexOf('Windows') !== -1) {
        // Tenta extrair informações do userAgent em ambientes Windows
        console.log('Detectado ambiente Windows via userAgent');
      }
    }
    
    console.log('Windows username detection not available in this environment');
    return null;
  } catch (error) {
    console.error('Unable to get Windows username:', error);
    return null;
  }
};

export const getWindowsIdentity = async (): Promise<WindowsIdentity | null> => {
  const username = await getWindowsUsername();
  if (!username) return null;
  
  // Tenta obter informações de domínio (apenas com ActiveX)
  try {
    if (typeof ActiveXObject !== 'undefined') {
      const network = new ActiveXObject('WScript.Network');
      return {
        username: network.UserName,
        domain: network.UserDomain
      };
    }
  } catch (error) {
    console.error('Error getting domain information:', error);
  }
  
  // Retorna apenas o nome de usuário se não conseguir o domínio
  return {
    username,
    domain: null
  };
};
