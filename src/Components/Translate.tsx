import {type CurrentUser, useCurrentUser} from '@sanity/sdk-react'
import { useState, useCallback, ChangeEvent } from 'react'
import { Card, Container, Grid, Heading,
  Inline, Radio, Button, Stack} from '@sanity/ui'
import { PublishIcon } from '@sanity/icons'
import { translateAgentAction } from '../sanity/actions/translateAction'

interface TranslateProps {
  docId: string,
  rwToken: string | undefined
}

interface TranslateChoice {
  id: string
  title: string
}

interface SelectedLanguages {
  from: TranslateChoice
  to: TranslateChoice
}

const LANGUAGES:TranslateChoice[] = [
  {id: "en-US", title: "English"},
  {id: "fr-Fr", title: "Français"},
  {id: "de-DE", title: "Deutsch"},
  {id: "it-IT", title: 'Italiano'},
  {id: "es-ES", title: 'Español'},
  {id: "ko-KR", title: '한국어'},
];

const findOption = (id:string | unknown) : TranslateChoice  => (
  LANGUAGES.find((choice)=> choice.id === id) || {id: '', title: 'unknown'}
)

export function Translate (props: TranslateProps) {
  const user: CurrentUser | null = useCurrentUser()
  const [translateMsg, setTranslateMsg] = useState('Translate')

  // Simeon's revert to useState form
  const [fromLanguage, setFromLanguage] = useState(LANGUAGES[0]);
  const [toLanguage, setToLanguage] = useState(LANGUAGES[1]);

  // and per Simeon, don't use any refs or useEffect

  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'from':
        setFromLanguage(findOption(value))
        break
      case 'to':
        setToLanguage(findOption(value))
        break
    }
  }, [])

  const handleTranslateClick = async () => {
    console.log('docId: ' + props.docId + ', from: ' + fromLanguage.id + ', to: ' + toLanguage.id)

    if (!props.docId) {
      alert('Please choose a Document to translate!')
      return
    }

    if (fromLanguage.id !== toLanguage.id) {
      setTranslateMsg('TRANSLATING!')
      // const transResult = await translateAgentAction(
      //     props.docId,
      //     fromLanguage,
      //     toLanguage,
      // )
      setTranslateMsg('Translate')
      alert ('Attempted translating from ' + fromLanguage.id + 'to ' + toLanguage.id)
      // console.log('Translation completed', JSON.stringify(transResult, null, 2))
    }
  }


  return (
    <Container width={1}>
      <Stack>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Heading as="h2">{translateMsg} from { fromLanguage.id } to { toLanguage.id }</Heading>
        </Card>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Grid columns={[2, 3, 4]} gap={3}>
            <Heading as='h3'>From: </Heading>
            { LANGUAGES.map ((option:TranslateChoice) => (
              <label>
                <Radio
                  checked={fromLanguage.id === option.id}
                  name="from"
                  onChange={handleChange}
                  value= {option.id}
                  key= {option.id}
                /> {option.title} </label>
            ))}
          </Grid>
        </Card>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Grid columns={[2, 3, 4]} gap={3}>
            <Heading as='h3'>To: </Heading>
            { LANGUAGES.map ((option:TranslateChoice) => (
              <label>
                <Radio
                  checked={toLanguage.id === option.id}
                  name="to"
                  onChange={handleChange}
                  value= {option.id}
                  key= {option.id}
                /> {option.title} </label>
            ))}
          </Grid>
        </Card>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Inline space={[3, 3, 4]}>
            <Button
              fontSize={[2, 2, 3]}
              // iconRight={CancelIcon}
              padding={[3, 3, 4]}
              radius="full"
              text="Cancel"
              tone="default"
              type='reset'
            />
            <Button
              fontSize={[2, 2, 3]}
              iconRight={PublishIcon}
              padding={[3, 3, 4]}
              radius='full'
              text="Translate"
              tone="primary"
              mode = {(fromLanguage && toLanguage) && fromLanguage.id !== toLanguage.id ? 'default' : 'ghost'}
              onClick={handleTranslateClick}
            />
          </Inline>
        </Card>
      </Stack>
    </Container>
  )
}
