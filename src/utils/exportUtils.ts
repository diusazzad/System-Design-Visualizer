import { toPng, toSvg } from 'html-to-image';

export const exportToImage = async (format: 'png' | 'svg', fileName: string) => {
  const node = document.querySelector('.react-flow') as HTMLElement;
  if (!node) return;

  try {
    const dataUrl = format === 'png' 
      ? await toPng(node, { backgroundColor: '#f8fafc' }) // slate-50
      : await toSvg(node, { backgroundColor: '#f8fafc' });

    const a = document.createElement('a');
    a.setAttribute('download', `${fileName}.${format}`);
    a.setAttribute('href', dataUrl);
    a.click();
  } catch (err) {
    console.error('Failed to export image', err);
    alert('Failed to export architecture diagram.');
  }
};

export const encodeStateToUrl = (state: any): string => {
  const jsonStr = JSON.stringify(state);
  return encodeURIComponent(btoa(jsonStr));
};

export const decodeStateFromUrl = (hash: string): any => {
  try {
    const jsonStr = atob(decodeURIComponent(hash));
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error('Failed to parse state from URL', err);
    return null;
  }
};
