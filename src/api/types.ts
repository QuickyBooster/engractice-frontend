export interface VocabularyType {
  id: string,
  english: string,
  vietnamese: string,
  mp3: string,
  tag: string[],
}

export interface VocabularyPayload {
  english: string,
  vietnamese: string,
  mp3: string,
  tag: string[],
}