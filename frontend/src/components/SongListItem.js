import React, { useEffect, useState } from "react";
import styled from "styled-components";


const SongListItem = ({ song }) => {
  return (
    <StyledList>
    	<StyledNumber>
    		#{song.rank}
    		<StreamAmount>
    			({song.streams} streams)
    		</StreamAmount>
    	</StyledNumber>
    	<StyledDiv>
	    	<p className="song_title">{song.title}</p>
	    	<p>by {song.artist}</p>
	    </StyledDiv>
	    <Publication>
	    	<p>publication date: {song.publicationDate}</p>
	    </Publication>
    </StyledList>
  );
};

const StyledList = styled.li`
	color: red;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-items: space-between;
	padding: 10px;
`;

const StyledDiv = styled.div`
	color: blue;
	
	.song_title{
		font-weight: bold;
		color: #000;
	}


`;

const StyledNumber = styled.div`
	color: black;
	font-size:40px;
`;

const StreamAmount = styled.div`
	color: grey;
	font-size:12px;
`;
const Publication = styled.div`
	color: grey;
	font-size:12px;
	
`;


export default SongListItem;