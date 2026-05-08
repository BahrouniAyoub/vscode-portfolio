export const RESUME_DOWNLOAD_PATH = '/Ayoub%20resume.pdf';
export const RESUME_DOWNLOAD_NAME = 'Ayoub resume.pdf';

export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = RESUME_DOWNLOAD_PATH;
  link.download = RESUME_DOWNLOAD_NAME;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
