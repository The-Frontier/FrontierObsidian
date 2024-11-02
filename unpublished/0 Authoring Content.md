
# Overview

This document gives an Overview and examples on how to author pages for the documentation. Quartz (the static site generator used) has some special functionalities on how to render markdown content in the web.

## Markdown
All content is generally authored in Markdown. All features of the markdown syntax can be used to style content in a page. For a quick reference, [Markdown Syntax](https://www.markdownguide.org/basic-syntax/) this website offers a great overview.

> [!warning]
> HTML is accepted in the markdown syntax. However since we are generating a website, HTML Codes inside a markdown file will impact the generation

### Obsidian specific markdown
Callouts/Admonitions like the one above are not a part of the general markdown syntax, this Editor (Obsidian) does allow them and they will be generated accordingly on the website. There are different types of apart from the example bewlo

```
> [!info]
> More types can be seen [here](https://notes.nicolevanderhoeven.com/Obsidian+Callouts)
```

> [!info]
> More types can be seen [here](https://notes.nicolevanderhoeven.com/Obsidian+Callouts)

### Inserting Images

### Tags
## Quartz
Since all markdown syntax is supported, there is only very few Quartz specific syntax to adhere to. Furthermore as you have noticed, files and folders in the  `unpublished` folder will not be published to the website and stay private.

### Properties
All notes created in the `content` folder will have a template applied, which has some properties that controls the created webpage.
- `draft`: Whether to publish the page or not. This is one way to make pages private in Quartz.
- `title`: Title of the page. If it isn’t provided, Quartz will use the name of the file as the title. Title and name can differ.
- `tags`: Tags for this note.
- `description`: Description of the page used for link previews.
- `aliases`: Other names for this note. This is a list of strings.
- `date`: A string representing the day the note was published. Normally uses `YYYY-MM-DD` format.

### Index page for subfolders
Quartz will create an index page for all pages under that folder. This includes any content that is multiple levels deep. Say if you have a note in a nested folder `content/abc/def/note.md`, an index page would be generated for all the notes under `abc` *and* a page for all the notes under `abc/def`.
In the text, you can link to the folder page by referencing its name, plus a trailing slash, like this: `[[FIC/]]`. This results in an index page being shown with a Table of contents for the folder.

> [!info]
> If you want to customize the appearance of the page, you need to create an index.md file in the folder, which overwrites the automatic page creation.

### Tag Listings
Quartz will also create an index page for each unique tag used and render a list of all notes with that tag. Quartz also supports tag hierarchies like this `fic/events` and will create a separate tag page for each level of the tag hierarchy. It will also create a default global tag index page at `/tags` that displays a list of all tags used. Like with the folder listings, you can also reference to this page like this: `[[tags/]]` or this: `[[tags/fic]]`.

> [!info]
> IAs with the folder listings, you can also provide a description and title for a tag page by creating a file for each tag. For example if you wanted to create a custom description for the #FIC tag, you would create a file at `content/tags/fic.md`