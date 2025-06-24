import {type CurrentUser, useCurrentUser} from '@sanity/sdk-react'
import { useState, useCallback, ChangeEvent } from 'react'
import { Card, Container, Grid, Heading,
  Inline, Radio, Button, Stack} from '@sanity/ui'
import { atom }from 'nanostores'
import { useStore } from '@nanostores/react'
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

const langOptions:TranslateChoice[] = [
  {id: "en-US", title: "English"},
  {id: "fr-Fr", title: "Français"},
  {id: "de-DE", title: "Deutsch"},
  {id: "it-IT", title: 'Italiano'},
  {id: "es-ES", title: 'Español'},
  {id: "ko-KR", title: '한국어'},
];

const findOption = (id:string | unknown) : TranslateChoice  => (
  langOptions.find((choice)=> choice.id === id) || {id: '', title: 'unknown'}
)

const $from = atom<TranslateChoice>(langOptions[0])
const $to = atom<TranslateChoice>(langOptions[0])

export function Translate (props: TranslateProps) {
  const user: CurrentUser | null = useCurrentUser()
  const [translateMsg, setTranslateMsg] = useState('Translate')

  // Get current values from atoms in integrated React fashion
  const from = useStore($from)
  const to = useStore($to)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updateAtom = name === 'from' ? $from : $to
    updateAtom.set(findOption(value))
  }, [])

  const handleTranslateClick = useCallback(async () => {
    // Directly read from atoms instead of refs
    const currentFrom = $from.get()
    const currentTo = $to.get()

    if (!props.docId) {
      alert('Please choose a Document to translate!')
      return
    }

    if (currentFrom.id !== currentTo.id) {
      setTranslateMsg('TRANSLATING!')
      console.log('category[0]')
      const target = {
        // path: ['title', 'body', 'author', 'mainIMage', 'categories', 'relatedPosts']
        // include: ['title']
        exclude: ['body']
      }
      const transResult = await translateAgentAction(
          props.docId,
          currentFrom,
          currentTo,
          target
      )
      setTranslateMsg('Translate')
      console.log('Translation completed', JSON.stringify(transResult, null, 2))
    }
  }, [props.docId]) // track when prop changes


  return (
    <Container width={1}>
      <Stack>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Heading as="h2">{translateMsg} from { from.id } to { to.id }</Heading>
        </Card>
        <Card padding={4} style={{textAlign: 'center'}}>
          <Grid columns={[2, 3, 4]} gap={3}>
            <Heading as='h3'>From: </Heading>
            { langOptions.map ((option:TranslateChoice) => (
              <label>
                <Radio
                  checked={from.id === option.id}
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
            { langOptions.map ((option:TranslateChoice) => (
              <label>
                <Radio
                  checked={to.id === option.id}
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
              mode = {(from && to) && from.id !== to.id ? 'default' : 'ghost'}
              onClick={handleTranslateClick}
            />
          </Inline>
        </Card>
      </Stack>
    </Container>
  )
}
