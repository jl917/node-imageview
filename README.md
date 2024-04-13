# node-imageview

### 설치

```sh
brew tap mongodb/brew
brew update
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```


### 방식1: 업로드 할떄 용도별 파일 생성

- method: post
- url: /uploadImages
- multipart/form-data
- body: {file: File}

```sh
curl --location 'http://localhost:5000/uploadImages' \
--form 'file=@"/Users/xxx/Downloads/5.png"'
```

### 방식2: 오리진 파일만 업로드 하고 url요청에 따라 파일 생성

- method: post
- url: /uploadImages2
- multipart/form-data
- body: {file: File}

```sh
curl --location 'http://localhost:5000/uploadImages2' \
--form 'file=@"/Users/xxx/Downloads/5.png"'
```

- method: post
- url: /uploadImages2
- multipart/form-data
- body: {file: File}

```sh
http://localhost:5000/image?p=upload/20240413/97a61d405b/original.png
```

- method: get
- url: /image
- params:
  - p(imagePath): string;
  - format(jpeg): jpeg | png | jpg
  - progressive(true): boolean
  - width: number
  - height: number
  - quality(80): 1-100
  - crop(5): 1-9