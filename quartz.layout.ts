import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      Home: "https://notes.bhodrolok.xyz",
      GitHub: "https://github.com/bhodrolok/yadg",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({ spacerSymbol: "-->", rootName: "Gate" }),
    Component.ArticleTitle(),
    Component.ContentMeta({ showReadingTime: false, showModifiedDate: true }),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.RecentNotes({ title: "Recent entries", limit: 3 }),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Explorer({ title: "Discoverer" })),
  ],
  right: [
    Component.Darkmode(),
    Component.Search(),
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({ spacerSymbol: "-->", rootName: "Gate" }), 
    Component.ArticleTitle(), 
    Component.ContentMeta({ showReadingTime: false }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.DesktopOnly(Component.Explorer({ title: "Discoverer" })),
  ],
  right: [
    Component.Darkmode(),
    Component.Search(),
    Component.RecentNotes({ title: "Recent entries", limit: 6 }),
  ],
}
