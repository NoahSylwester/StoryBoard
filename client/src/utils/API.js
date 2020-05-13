import posts from './postAPI';
import threads from './threadAPI';
import snippets from './snippetAPI';
import users from './userAPI';
import events from './eventAPI';
import topics from './topicAPI';

export default {
    ...posts,
    ...threads,
    ...snippets,
    ...events,
    ...topics,
    ...users,
};

