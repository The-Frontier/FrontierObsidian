
# Overview

This document gives an Overview and examples on how to author pages for the documentation. Quartz (the static site generator used) has some special functionalities on how to render markdown content in the web.

## Markdown
All content is generally authored in Markdown. All features of the markdown syntax can be used to style content in a page. For a quick reference, [Markdown Syntax](https://www.markdownguide.org/basic-syntax/) this website offers a great overview.

> [!warning]
> HTML is accepted in the markdown syntax. However since we are generating a website, HTML Codes inside a markdown file will impact the generation

### Linking notes/pages
When wanting to link to other pages, use a wikilink like this [[0 Test Page for Linking]] `[[0 Test Page for Linking]]`. When the website is generated, a link to the note is generated.

### Obsidian flavoured markdown
Callouts/Admonitions like the one above are not a part of the general markdown syntax, this Editor (Obsidian) does allow them and they will be generated accordingly on the website. There are different types of apart from the example below.

```
> [!info]
> More types can be seen [here](https://notes.nicolevanderhoeven.com/Obsidian+Callouts)
```

> [!info]
> More callout types can be seen [here](https://notes.nicolevanderhoeven.com/Obsidian+Callouts).

> [!info]
> For an overview of all obsidian flavoured markdown, have a look [here](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown).

### Tags
Tags can give more context to the note itself. It will also show all tags of the note on the website for easier navigation and grouping (see [[00 Authoring Content#Tag Listings]]). Only create tags in the Tags Property of the note, so it can correctly render on the website.  A tag is created with a `#` in front of the text like #fic. The case of the letters does not matter.

> [!info]
> It is recommended to only write lowercase letters in the tag.

### Embedding Images
Embedding images is as easy as copy and pasting. The image in the clipboard should be inserted into the `/attachments` folder and a wikilink like 
`![[attachments/image.png]]` should appear in the note. Renaming the image is recommended, the link should auto-update when renaming the image. To change the size of the image adjust the wikilink like this: 
`![[attachments/image.png|500]]` which will render the image 500px wide and keep the aspect-ratio.

> [!warning]
> Only images in the `/attachments` folder will be displayed on the website.

> [!info]
> It is recommended to only use .svg files when embedding images, as they will scale losless on the website. If nothing else is available, .png files are also a good choice. Try to avoid .jpg files.

### Embedding Static Content
When wanting to add static content like videso or pdf files, you can simply add the file to the current folder. It will be accessible through its path ie. `path/to/static.pdf`. The file can be linked with a wiki link like you would link to other pages.

> [!info]
> Try to avoid using pdfs in this documentation as it will not fit the overall theme. Furthermore try to always embed images into a corresponding note and provide more information.

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
- `order`: A string consisting of numbers that controls the order in which the files are shown in lists on the website. 000 will be shown before 00, will be shown before 1.

### Index page for subfolders
Quartz will create an index page for all pages under that folder. This includes any content that is multiple levels deep. Say if you have a note in a nested folder `content/abc/def/note.md`, an index page would be generated for all the notes under `abc` *and* a page for all the notes under `abc/def`.
In the text, you can link to the folder page by referencing its name, plus a trailing slash, like this: `[[FIC/]]`. This results in an index page being shown with a Table of contents for the folder.

> [!info]
> If you want to customize the appearance of the page, you need to create an index.md file in the folder. This will give you the ability to add a more detailed description. The folder pages will still be generated underneath your custom content.

### Tag Listings
Quartz will also create an index page for each unique tag used and render a list of all notes with that tag. Quartz also supports tag hierarchies like this `fic/events` and will create a separate tag page for each level of the tag hierarchy. It will also create a default global tag index page at `/tags` that displays a list of all tags used. Like with the folder listings, you can also reference to this page like this: `[[tags/]]` or this: `[[tags/fic]]`.

> [!info]
> As with the folder listings, you can also provide a description and title for a tag page by creating a file for each tag. For example if you wanted to create a custom description for the #fic tag, you would create a file at `content/tags/fic.md`. As with the folder listings, the list of files that use this specific tag will still be generated underneath your custom content.