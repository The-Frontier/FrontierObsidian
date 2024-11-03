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
          console.log(a.displayName, b.displayName, orderA, orderB);
          // If both have order values, compare lexicographically as strings
          if (orderA !== undefined && orderB !== undefined) {
            if (orderA < orderB) return -1;
            if (orderA > orderB) return 1;
            console.log("orderA === orderB", orderA, orderB);
            console.log("Compared numbers");
            return 0;
          }

          // If only one has an order value, that one should come first
          if (orderA !== undefined) {
            console.log("No order value for B");
            return -1;
          }
          if (orderB !== undefined) {
            console.log("No order value for A");
            return 1;
          }

          // If neither has an order value, default to alphabetical sorting
          if ((!a.file && !b.file) || (a.file && b.file)) {
            console.log("No order value for either");
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
          // Extract order values as strings
          const orderA = a.file?.frontmatter?.order?.toString();
          const orderB = b.file?.frontmatter?.order?.toString();
          console.log(a.displayName, b.displayName, orderA, orderB);
          // If both have order values, compare lexicographically as strings
          if (orderA !== undefined && orderB !== undefined) {
            if (orderA < orderB) return -1;
            if (orderA > orderB) return 1;
            console.log("orderA === orderB", orderA, orderB);
            console.log("Compared numbers");
            return 0;
          }

          // If only one has an order value, that one should come first
          if (orderA !== undefined) {
            console.log("No order value for B");
            return -1;
          }
          if (orderB !== undefined) {
            console.log("No order value for A");
            return 1;
          }

          // If neither has an order value, default to alphabetical sorting
          if ((!a.file && !b.file) || (a.file && b.file)) {
            console.log("No order value for either");
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
  right: [],
};
