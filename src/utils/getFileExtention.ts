export function getFileExtension(filename: string | undefined) {
  if (!filename) {
    return "";
  }
  // 마지막 점(`.`)의 위치를 찾습니다.
  const lastDotIndex = filename.lastIndexOf(".");

  // 마지막 점이 없다면 확장자가 없는 파일입니다.
  if (lastDotIndex === -1) {
    return ""; // 빈 문자열 반환
  }

  // 점 이후의 문자열을 반환합니다.
  return filename.substring(lastDotIndex + 1);
}
