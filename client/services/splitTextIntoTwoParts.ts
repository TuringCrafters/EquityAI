export const splitTextIntoTwoParts = (text: string ) => {
    const splitText = text?.split('.') || [];
    const midpoint = Math.ceil(splitText.length / 2);
    const firstHalf = splitText.slice(0, midpoint).join('.');
    const secondHalf = splitText.slice(midpoint).join('.');
    return { firstHalf, secondHalf };
  };