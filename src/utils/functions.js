export const getTrueFalseByYandN = value => {
  return value === 'Y';
};

export const getUniqArrayByCommentId = list => {
  return list?.filter((obj, i) => {
    return i === list?.findIndex(o => obj.commentId === o.commentId);
  });
};
