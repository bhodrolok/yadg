import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  // Whether to display estimated reading time
  showReadingTime: boolean
  // Whether to display note's last modified date
  showModifiedDate: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showModifiedDate: false,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      // HTML elements to be displayed
      const segments: (string | JSX.Element)[] = []

      // Display date(s)
      if (fileData.dates) {
        segments.push(`Planted: ${formatDate(getDate(cfg, fileData)!, cfg.locale)}`)
        if (options.showModifiedDate) {
          segments.push(`Last watered: ${formatDate(fileData.dates.modified, cfg.locale)}`)
        }
      }

      // Display estimated reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(displayedTime)
      }

      // Display computed segment elements in order
      const segmentsElements = segments.map((segment) => <span>{segment}<br/></span>)

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segmentsElements}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
