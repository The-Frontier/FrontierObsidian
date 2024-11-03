import { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Org Link": "https://robertsspaceindustries.com/orgs/THEFRONT",
      "The FrontierDiscord": "https://discord.gg/the-frontier",
    },
  }),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        sortFn: (a, b) => {
          // Extract order values as strings
          const orderA = a.file?.frontmatter?.order?.toString();
          const orderB = b.file?.frontmatter?.order?.toString();
          // If both have order values, compare lexicographically as strings
          if (orderA !== undefined && orderB !== undefined) {
            if (orderA < orderB) return -1;
            if (orderA > orderB) return 1;
            return 0;
          }

          // If only one has an order value, that one should come first
          if (orderA !== undefined) {
            return -1;
          }
          if (orderB !== undefined) {
            return 1;
          }

          // If neither has an order value, default to alphabetical sorting
          if ((!a.file && !b.file) || (a.file && b.file)) {
            return a.displayName.localeCompare(b.displayName, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          }

          // Handle case where one has a file and the other does not
          if (a.file && !b.file) {
            return 1;
          } else {
            return -1;
          }
        },
      })
    ),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(
      Component.Explorer({
        title: "TOC", // title of the explorer component
        folderClickBehavior: "collapse", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
        folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
        useSavedState: true, // whether to use local storage to save "state" (which folders are opened) of explorer
        // Sort order: folders first, then files. Sort folders and files alphabetically
        sortFn: (a, b) => {
          const nameOrderMap: Record<string, number> = {
            "Sorting2": 10,
            "Sorting": 20,
            "FIC": 30,
          };

          const nameA = a.displayName;
          const nameB = b.displayName;

          // Default to alphabetical sorting if neither has an order value
          if ((!a.file && !b.file) || (a.file && b.file)) {
            return nameA.localeCompare(nameB, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          }

          // Handle case where one has a file and the other does not
          if (a.file && !b.file) {
            return 1;
          } else {
            return -1;
          }
        },
      })
    ),
  ],
  right: [],
};
