ALTER SEQUENCE reviews_id_seq RESTART;

INSERT INTO
  reviews (reviewer_name, content, rating, snack_id)
VALUES
  (
    'David',
    'Esse veniam pariatur adipisicing adipisicing non eiusmod eu sit ut nostrud aute.',
    4,
    1
  ),
  (
    'Xander',
    'Mollit laborum non ut tempor amet ea laborum voluptate elit laboris sint sunt officia nostrud.',
    3,
    1
  ),
  (
    'Kayla',
    'Sint ea reprehenderit cupidatat sunt eu nisi aute id commodo anim magna et fugiat.',
    4,
    1
  ),
  (
    'Xander',
    'Aliquip dolore tempor nostrud qui ullamco officia.',
    5,
    2
  ),
  (
    'Angie',
    'Velit culpa fugiat irure culpa ipsum deserunt sit laborum mollit ut tempor veniam est.',
    5,
    2
  ),
  (
    'Emily',
    'Aliqua labore deserunt Lorem nostrud sit.',
    3,
    2
  ),
  (
    'Reggie',
    'Ut aute fugiat quis tempor cupidatat eiusmod sit ut veniam.',
    5,
    2
  ),
  (
    'Reggie',
    'In nisi laboris irure deserunt cupidatat minim esse eu id.',
    2,
    3
  ),
  (
    'Phoenix',
    'Proident occaecat exercitation nostrud velit.',
    1,
    3
  ),
  (
    'Jaden',
    'In irure est exercitation veniam tempor ea exercitation eu.',
    2,
    3
  ),
  (
    'Eli',
    'Culpa quis incididunt enim laboris cupidatat anim voluptate non consectetur veniam eiusmod.',
    3,
    4
  ),
  (
    'Stef',
    'Incididunt sunt eiusmod sunt in nulla.',
    1,
    5
  ),
  (
    'Oliver',
    'Proident commodo Lorem sint laborum.',
    1,
    5
  );