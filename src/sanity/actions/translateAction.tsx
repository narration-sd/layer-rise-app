import { client } from "../lib/client";
import type { SanityClient } from 'sanity'
import { rwToken } from "../env"
import React, { useState } from 'react';
import { EarthGlobeIcon } from '@sanity/icons';

const rwClient:SanityClient = client.withConfig({
  token: rwToken,
});

interface TranslateChoice {
  id: string
  title: string
}

interface SelectedLanguages {
  from: TranslateChoice
  to: TranslateChoice
}

export const translateAgentAction= async (
  docId: string,
  from: TranslateChoice,
  to: TranslateChoice) => {

  console.log('Translating: ' + from.id + ' to: ' + to.id)

  return rwClient.agent.action.translate({
    // Replace with your schema ID
    schemaId: "_.schemas.default",
    // Tell the client the ID of the document to use as the source.
    documentId: docId,

    // Set the operation mode
    targetDocument: { operation: "create" },
    // Set the 'from' and 'to' language
    fromLanguage: from, //{id: "en-US", title: "English"},
    // toLanguage: {id: "de-DE", title: "German"},
    toLanguage: to, // {id: "it-IT", title: "Italian"},

    // parameterized styleGuide used to tune the translation.
    styleGuide:
      "Don't translate product names, company names, " +
      "or technical terms and phrases, even if word order " +
      "would be different in the target language." +
      "Don't translate the following words or phrases: $stopWords.",
    styleGuideParams: {
      stopWords: 'heart, rhythm, disorder'
    },
    // experiments here to surround the empty categories problem if possible.
    // target: {
    //   // include: ['title','mainImage', 'body','categories']
    //   exclude: [ 'categories']
    // },
    // conditionalPaths: {
    //   defaultReadOnly: true,
    //   defaultHidden: true
    // }
  });
}
