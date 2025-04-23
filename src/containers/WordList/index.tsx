import { FC } from "react";

type Props = {
  words: any[];
}

const WordList: FC<Props> = ({...props}) => {
  const { words } = props

  return (
    <div>
      <h2 style={{paddingBottom: '20px'}}>Word List</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index}>
            {word.english} - {word.vietnamese} ({word.tags.join(', ')})
          </li>
        ))}
      </ul>
    </div>
  )
};

export default WordList;