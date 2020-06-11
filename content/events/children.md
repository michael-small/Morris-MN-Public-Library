---
template: DefaultPage
slug: children
title: Children's Events
featuredImage: https://ucarecdn.com/0a485165-65c4-42ee-bf35-b93fbaf0fd2e/-/preview/-/rotate/270/
meta:
  description: test meta description
  title: test meta title
---
This is placeholder text that our web designers put here to make sure words appear properly on your website. This text is going to be replaced once the website is completed. You are currently reading text that is written in English, not any other language.

Be careful not to waste too much time reading placeholder text! This text isn’t going to remain here because it doesn't pertain to the website. This paragraph has been copied from a program that automatically generates paragraphs like this.

# Query the events with:

query Events {
    eventsPages: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "events" } } }
      sort: { order: ASC, fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
