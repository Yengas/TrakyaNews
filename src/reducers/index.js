import { combineReducers } from 'redux'
import NewsReducer from "./NewsReducer";
import NoticesReducer from "./NoticesReducer";
import ListingReducer from "./ListingReducer";

export default combineReducers({
  news: NewsReducer,
  notices: NoticesReducer,
  listing: ListingReducer
});