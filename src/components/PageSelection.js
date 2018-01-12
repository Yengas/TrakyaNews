import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PageSelectionButton from './PageSelectionButton';

function range(start, end, direction = 1, limit = 9999){
  return [...Array(Math.min(end - start + 1, limit)).fill(direction > 0 ? start : end).map((x, i) => x + (i * direction))]
}

/**
 * Pick which pages to show given a start, end and toShow parameters.
 *
 * @param start the number of the first page to show. inclusive.
 * @param end the number of the last page to show. inclusive.
 * @param toShow how many pages to show.
 * @param leftLean wether to give more probability to left pages to show.
 */
function pickWithSpacing(start, end, toShow, leftLean = true){
  if(end - start + 1 <= toShow){
    return range(start, end);
  }

  return range(start, end, leftLean ? 1 : -1, toShow);
}

function calculatePagesToShow(min = 1, max = 1, selected = min, toShow = 10){
  let firstHalf = Math.min(selected - min, Math.floor((toShow - 1) / 2));
  const secondHalf = Math.min(max - selected, toShow - 1 - firstHalf);
  if(firstHalf + secondHalf < toShow) firstHalf = Math.min(selected - min, toShow - secondHalf - 1);

  return [
    ...pickWithSpacing(min, selected - 1, firstHalf, false),
    selected,
    ...pickWithSpacing(selected + 1, max, secondHalf, true)
  ].filter((x, i, arr) => arr.indexOf(x) === i).sort((a, b) => a - b);
}

class PageSelection extends Component{


  render(){
    const { min, max, selected, toShow } = this.props;
    const { pageChanged } = this.props;
    const pages = calculatePagesToShow(min, max, selected, toShow);
    const totalPages = max - min + 1;

    return (<View style={{ flexDirection: 'row', flex: 1 }}>
      <PageSelectionButton content={"<"} disabled={selected <= min} onClick={() => pageChanged(selected - 1)} />
      { pages.map(page => <PageSelectionButton content={page} key={page} disabled={page === selected} onClick={() => pageChanged(page)} />) }
      <PageSelectionButton content={">"} disabled={selected >= max} onClick={() => pageChanged(selected + 1)} />
    </View>);
  }
}

export default PageSelection;