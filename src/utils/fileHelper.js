export const getFileExtension = filename => {
  if (filename) return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  return null;
};

export const getFileName = (fileUrl, removeExt = false) => {
  const filename = fileUrl.split('/').pop();
  if (removeExt) {
    return filename
      .split('.')
      .slice(0, -1)
      .join('.');
  }
  return filename;
};

export const downloadFile = fileUrl => {
  const downloadFileName = getFileName(fileUrl);
  const link = document.createElement('a');
  link.href = fileUrl;
  link.target = '_blank';
  link.setAttribute('download', downloadFileName); //or any other extension
  document.body.appendChild(link);
  link.click();
  link.parentNode.removeChild(link);
};

export const convertToBase64 = file =>{
  return new Promise(resolve => {
    let baseUrl = '';
    let reader = new FileReader();

    // convert file to base64
    reader.readAsDataURL(file);

    reader.onload = () => {
      baseUrl = reader.result;
      resolve(baseUrl);
    };
  });
}

export const getAssetsUrl = fileUrl => {
  return `/images/${fileUrl}`;
};

export const getAutoCompleteValue = (options, value, field = 'id', intVal = { id: '', name: '' }) => {
  return Array.isArray(options) ? options.find(option => option[field]=== value) ?? null : null;
};
