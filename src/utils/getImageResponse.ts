import axios from "axios";

export const getImageResponse = async (filePath: string) => {
  // 외부 이미지의 URL을 정의
  const imageURL = `http://localhost:5000/${filePath}`;
  // `axios`를 사용하여 외부 이미지 다운로드
  const response = await axios.get(imageURL, {
    responseType: "arraybuffer", // 바이너리 데이터를 받기 위해 responseType 설정
  });

  return response;
};
