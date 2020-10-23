import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SongListItem from "./SongListItem";

const SongList = ({ songs }) => {
  return (
    <SongItem>
      {songs.map((song) => {
        return <SongListItem song={song}></SongListItem>
      })}
    </SongItem>
  );
};

const SongItem = styled.ul`

`;

export default SongList;