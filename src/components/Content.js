import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Marked from 'react-markdown'
import PropTypes from 'prop-types'
import Image from './Image'

import './Content.css'

const encodeMarkdownURIs = (source = '') => {
  const markdownLinkRegex = /\[(.+)\]\((.+)(".+)\)/g
  console.log(source)
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

const withContentImages = source => {
  const images = source.match(/<img(.*?)\\?>/gim)

  for (let i in images) {
    const src = /src="(.*?)"/g.exec(images[i]),
      alt = /alt="(.*?)"/g.exec(images[i]),
      title = /title="(.*?)"/g.exec(images[i])
    source = source.replace(
      images[i],
      ReactDOMServer.renderToStaticMarkup(
        <Image
          resolutions="medium"
          className="Content--Image"
          lazy={false}
          src={src ? src[1] : null}
          alt={alt ? alt[1] : null}
          title={title ? title[1] : null}
        />
      )
    )
  }

  return source
}

const MyImage = ({ nodeKey, src, title, alt }) => {
  const decodedSrc = decodeURI(src)
  return (
    <Image
      className="Content--Image markdown-preview"
      resolutions="medium"
      lazy={false}
      src={decodedSrc}
      title={title}
      alt={alt}
    />
  )
}

const HtmlBlock = ({ value }) => {
  if (value.indexOf('<iframe') !== 0) return value
  return (
    <div
      className={`Content--Iframe`}
      dangerouslySetInnerHTML={{
        __html: value
      }}
    />
  )
}

const Content = ({ source, src, className = '' }) => {
  // accepts either html or markdown
  source = source || src || ''
  if (source.match(/^</)) {
    source = withContentImages(source)

    return (
      <React.Fragment>
      <div
        className={`Content ${className}`}
        dangerouslySetInnerHTML={{ __html: source }}
      />
        <div className="smallDisplay">
          <iframe src="https://calendar.google.com/calendar/b/4/embed?height=400&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FChicago&amp;src=ZGV2dGVzdGVyMmsyMEBnbWFpbC5jb20&amp;color=%23039BE5&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showCalendars=0&amp;mode=AGENDA&amp;title=Does%20title%20even%20matter%3F&amp;showTitle=0&amp;showDate=0&amp;showNav=1" className="mobileIframe" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
        <div className="largeDisplay">
          <iframe src="https://calendar.google.com/calendar/b/4/embed?height=400&amp;wkst=1&amp;bgcolor=%23B39DDB&amp;ctz=America%2FChicago&amp;src=ZGV2dGVzdGVyMmsyMEBnbWFpbC5jb20&amp;color=%23039BE5&amp;showPrint=0&amp;showTabs=0&amp;showTz=0&amp;showCalendars=0&amp;mode=MONTH&amp;title=Does%20title%20even%20matter%3F&amp;showTitle=0&amp;showDate=0&amp;showNav=1" className="desktopIframe" width="800" height="600" frameborder="0" scrolling="no"></iframe>
        </div>
      </React.Fragment>
    )
  }

  return (
    <Marked
      className={`Content ${className}`}
      source={encodeMarkdownURIs(source)}
      renderers={{
        image: MyImage,
        html: HtmlBlock
      }}
    />
  )
}

Content.propTypes = {
  source: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
}

export default Content
