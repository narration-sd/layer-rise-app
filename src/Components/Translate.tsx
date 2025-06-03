import {type CurrentUser, useCurrentUser} from '@sanity/sdk-react'
import { useState, useCallback, ChangeEvent, useEffect, useRef } from 'react'
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

export function Translate (props: TranslateProps) {
  const user: CurrentUser | null = useCurrentUser()

  const [from, setFrom] = useState<TranslateChoice>(langOptions[0])
  const [to, setTo] = useState<TranslateChoice>(langOptions[0])
  const [translateMsg, setTranslateMsg] = useState('Translate')

  const fromRef = useRef (from)
  const toRef = useRef (to)

  useEffect (() => {
    fromRef.current = from
    toRef.current = to
    console.log('set refs from: ' + fromRef.current.id + ', to: ' + toRef.current.id)
  }, [from, to])

  const handleChange = useCallback((e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'from':
        setFrom(findOption(value))
        break
      case 'to':
        setTo(findOption(value))
        break
    }
  }, [])

  const handleTranslateClick = useCallback (async () => {
    console.log('docId: ' + props.docId + ', from: ' + fromRef.current.id + ', to: ' + toRef.current.id)

    if (!props.docId) {
      alert ('Please choose a Document!')
      return
    }

    if (/*from.id && to.id &&*/ fromRef.current.id !== toRef.current.id) {
      // alert ('Translating...docId: ' + props.docId)
      // call translate agent
      setTranslateMsg('TRANSLATING!')
      const transResult
        = await translateAgentAction(props.docId, fromRef.current, toRef.current)
      setTranslateMsg('Translate')

      console.log('Translation completed: ' +
        fromRef.current.title + ' to ' +
        toRef.current.title +'!' // );
        + ' -- transResult: ' + JSON.stringify(transResult));
    }
  }, [props.docId])


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
