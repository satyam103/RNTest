import React from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import RenderHTML from 'react-native-render-html';

const RenderHtmlScreen = () => {
  const source = {
    html: `
    <html>
        <head>
        <style>
            table, th, td {
                border:1px solid black;
            }
        </style>
        
        </head>
            <body>
            <p>hello from paragraph tag</p>
            <table>
                <tr>
                <th>Emil</th>
                <th>Tobias</th>
                <th>Linus</t>
                </tr>
                <tr>
                <td>16</td>
                <td>14</td>
                <td>10</td>
                </tr>
            </table>
            </body>
        </html>`,
  };

  const {width} = useWindowDimensions();
  return (
    <View>
      <Text>hhj</Text>
      <RenderHTML
        contentWidth={width}
        source={source}
        tagsStyles={{
          table: {
            backgroundColor: 'red',
          },
          p: {
            fontSize: 17,
            fontWeight: '500',
            backgroundColor: 'yellow',
            // color: '#ffff',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          h: {
            fontSize: 17,
            fontWeight: '500',
            // color: '#ffff',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          a: {
            fontSize: 17,
            fontWeight: '500',
            // color: '#ffff',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          span: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          tr: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          td: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          th: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          table: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          tbody: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
          figure: {
            fontSize: 17,
            fontWeight: '500',
            color: 'black',
            textAlign: 'left',
            marginTop: 40,
            opacity: 0.9,
          },
        }}
      />
    </View>
  );
};

export default RenderHtmlScreen;
