import { combineReducers } from 'redux'
import NewsReducer from "./NewsReducer";
import NoticesReducer from "./NoticesReducer";
import ListingReducer from "./ListingReducer";
import DetailsReducer from "./DetailsReducer";

export default combineReducers({
  news: NewsReducer,
  notices: NoticesReducer,
  listing: ListingReducer,
  details: DetailsReducer
});