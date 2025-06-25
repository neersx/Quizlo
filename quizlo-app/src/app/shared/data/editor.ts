export default {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          level: 1,
          align: null,
        },
        content: [
          {
            type: 'text',
            text: 'Hello',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          align: null,
        },
        content: [
          {
            type: 'text',
            text: 'This is editable text. ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'text_color',
                attrs: {
                  color: '#d93f0b',
                },
              },
            ],
            text: 'You can focus it and start typing',
          },
          {
            type: 'text',
            text: '.',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          align: null,
        },
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: 'code block',
          },
        ],
      },
      {
        type: 'blockquote',
        content: [
          {
            type: 'paragraph',
            attrs: {
              align: null,
            },
            content: [
              {
                type: 'text',
                marks: [
                  {
                    type: 'strong',
                  },
                ],
                text: 'Lorem Ipsum',
              },
              {
                type: 'text',
                text: ' is ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'text_background_color',
                    attrs: {
                      backgroundColor: '#fbca04',
                    },
                  },
                ],
                text: 'simply dummy',
              },
              {
                type: 'text',
                text: ' text of the printing and typesetting industry. ',
              },
              {
                type: 'text',
                marks: [
                  {
                    type: 'em',
                  },
                ],
                text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
              },
              {
                type: 'text',
                text: ', when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
              },
            ],
          },
        ],
      }
    ],
  };