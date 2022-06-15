export const getBoardsCards = (boardId, cards) => {
    let boardsCards = [];
    for (const card of cards) {
      if (card.boardId === boardId) boardsCards.push(card);
    };
    return boardsCards;
};

export const orderCardsBySlot = (cards) => {
  let dict = {};
  let orderedCards = [];
  for (const card of cards) {
    dict[card.slot.toString()] = card;
  };
  for (let i = 0; i < cards.length; i++) {
    orderedCards.push(dict[(i+1).toString()]); 
  };
  return orderedCards;
};
  
const getCardById = (id, cards) => {
  for (const card of cards) {
    if (card.id === id) return card
  }
  return null
}

export const removeCard = (cardToRem, cards) => {
  const {id, boardId, slot} = cardToRem;
  let newCards = [];
  for (const card of cards) {
    if (card.id !== id) {
      let edits = {};
      if (card.boardId === boardId && card.slot > slot) {
        edits["slot"] = card.slot - 1;
      };
      newCards.push({...card, ...edits});
    };
  };
  return newCards;
}

export const editCardsByCard = (cards, cardId, edits) => {

  const draggedCard = getCardById(cardId, cards);

  let newCards = [];
 
  const slot = edits.slot || draggedCard.slot;
  const boardId = edits.boardId || draggedCard.boardId

  let lastSlot = getBoardsCards(boardId, cards).length + 1;

  for (const card of cards) {
      if (card.id === cardId) {
        if (slot === lastSlot && !edits.boardId) {
          edits["slot"] = slot - 1
        };
        newCards.push({...card, ...edits});
      } else {
        if (edits.boardId) { // if isDiffBoard
          if (slot !== lastSlot && card.boardId === edits.boardId && card.slot >= slot) { // if you're on the new board and you're = or below the (not last) drop point
            newCards.push({...card, slot: card.slot + 1});
          } else if (card.boardId === draggedCard.boardId && card.slot > draggedCard.slot) { // if you're on the old board and below the drag point
              newCards.push({...card, slot: card.slot - 1});
          } else {
            newCards.push(card)
          };
        } else {
          if (card.boardId === draggedCard.boardId) { // if you're on a board where a change has happened
            if (draggedCard.slot > slot && card.slot >= slot && card.slot < draggedCard.slot) {
                newCards.push({...card, slot: card.slot + 1});
            } else if (draggedCard.slot < slot && card.slot <= slot && card.slot > draggedCard.slot) {
                newCards.push({...card, slot: card.slot - 1});
            } else {
                newCards.push(card);
            };
          } else {
            newCards.push(card);
          };
        };
      };
  };

  return newCards;
};
  