import ImmutablePropTypes from 'react-immutable-proptypes';
import Proptypes from 'react';
import Formatter from 'Util/Formatter';
import Tag from 'Models/Tag';

export default class Task extends IRecord({
  id: null,
  name: '',
  description: '',
  tags: IList(),
  // TODO: バックから文字列で来る→文字列をフォーマットするというのが主になってしまっている
  // Date→dayjsの変換が可能であれば、型をDateとかにしたい
  finishedAt: '',
  workingTime: 0,
}) {
  static t = ImmutablePropTypes.recordOf({
    id: Proptypes.number,
    name: Proptypes.string,
    description: Proptypes.string,
    tags: ImmutablePropTypes.list,
    finishedAt: Proptypes.string,
    workingTime: Proptypes.number,
  });

  static fromJS = (params) => {
    return new Task(params).withMutations((s) => {
      s.set('finishedAt', Formatter.toDate(params.finishedAt));
      s.set('workingTime', params.workingTime);
      _.isEmpty(params.tags)
        ? IList()
        : s.set('tags', IList(params.tags.map((t) => Tag.fromJS(t))));
    });
  };
}
