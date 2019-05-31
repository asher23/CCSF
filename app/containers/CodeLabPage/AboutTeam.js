import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getTeamList } from './actions';

import makeSelectCodeLabPage, { makeSelectUser } from './selectors';

export function AboutTeam({ codeLabPage, user, dispatch }) {
  const { codeLab, teamList } = codeLabPage;

  useEffect(() => {
    console.log('r u calling ti again');
    dispatch(getTeamList(codeLab.memberIds));
  }, []);

  if (!teamList) return <h1>dowm</h1>;

  return (
    <Container
      fluid
      style={{
        backgroundColor: 'rgb(239,247,212, 0.3)',
        minHeight: '100vh',
        marginTop: '-66px',
        paddingTop: '70px',
      }}
    >
      <h1>About Team</h1>
      {/* <p>{aboutTeam}</p> */}
      {teamList.map(teamMember => {
        return (
          <div>
            <h3>
              <Link to={`/profile/${teamMember.id}`}>
                {`${teamMember.username}, ${teamMember.firstName} ${
                  teamMember.lastName
                }`}
              </Link>
            </h3>
            <p>{teamMember.introduction || 'Hi. I am a member of this team'}</p>
          </div>
        );
      })}
    </Container>
  );
}

AboutTeam.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  codeLabPage: makeSelectCodeLabPage(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AboutTeam);
