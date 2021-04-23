const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while(optionButtonsElement.firstChild){
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option =>{
    if (showOption(option)){
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option){
  return   option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Your name is Spencer Hawk, a young detective in the town of Hollowdale. You have been asked to solve the mysterious disappearance of Raven Blossom. She was last seen at the Hollow Mansion.',
    options: [
      {
        text: 'Go to the Hollow Mansion.',
        setState: { locMansion: true},
        nextText: 2
      },
    ]
  },
  {
    id: 2,
    text: 'You are at the Hollow Mansion. You meet the family of Raven Blossom. They are very upset and need your help. Find out what happend.',
    options: [
      {
        text:'Look for clues.',
//        requiredState: (currentState) => currentState.locMansion,
//        setState: { locMansion: false, search: true },
        nextText: 3
      },
      {
        text:'Ask what happened.',
//        requiredState: (currentState) => currentState.locMansion,
//        setState: { locMansion: false, ask:true},
        nextText: 4
      }
    ]
  },
  {
    id: 3,
    text: 'You go to Ravens room. The room seems like a tornado passed through it. Her wardrobe is half empty, it seems like she grabbed important stuff and took of. There are also scratches on the wall, looks like there was a fight. You see a letter on her desk.',
    options: [
      {
        text: 'Go to main area of the mansion and read the letter.',
//        requiredState: (currentState) => currentState.search,
//        setState: { search:false, letter: true},
        nextText: 5
      },
      {
        text: 'Look for more clues in the room.',
//        requiredState: (currentState) => currentState.search,
//        setState: { search:false, letter: true},
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text:'Ravens sister tells you that the last time they saw her was when she rushed back home a few hours ago. She was upset, didnt talk to anyone, went straight to her room. At dusk, half an hour after she came home they heard a loud thunder-like noise is, heard followed by a scream.',
    options:[
      {
        text: 'Ask to look around the mansion for clues, starting from Ravens bedroom.',
//        requiredState: (currentState) => currentState.ask,
//        setState: { ask: false, clue:true },
        nextText: 3
      },
      {
        text: 'Ask for more information.',
        nextText: 7
      }
    ]
  },
  {
    id: 6,
    text: 'You are looking for more clues.',
    options:[
      {
        text:'No more clues. Go to main area and read the letter.',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text:'You tell everyone you found a letter. You reed it out loud. It says: If you want Raven back, you have to find her by dawn, or you will never see her again.',
    options:[
      {
        text:'Ask what happend',
        nextText:4
      },
      {
        text: 'Already asked the family.',
        nextText: 9
      },
      {
        text:'Call the police, you cant solve this.',
        nextText: 8
      }
    ]
  },
  {
    id: 7,
    text:' Ravens sister shares that Raven was suspicious of someone from the family. She thought that person would harm her.',
    options:[
      {
        text:'Ask to look for clues.',
        nextText: 3
      },
      {
        text:'Call the police, you cant solve this mystery by yourself.',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text:'You want to call the police, because this mystery needs more people on it. Everyone agrees.',
    options:[
      {
        text:'You called the police, but due to the bad weather, the storm slows them down and they come after dawn. Restart the game.',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text:'You notice wet footprints near the corridor. You ask if anyone has been out in the last hour. Everybody says that they have been home the whole day.',
    options:[
      {
        text:'Investigate the footprints.',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text:'You get closer to the footprints. You see they lead to a closet. Next to the closet there is a pair of wet slippers. You ask whose are they. The sister answers they are Ravens.',
    options:[
      {
        text:'You dont think much of it.',
        nextText: -1
      },
      {
        text:'You go in the closet.',
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text:'You see all of the coats are moved to the side, there is a secret door. You wonder whats behind it.',
    options:[
      {
        text:'Open the door.',
        nextText: 12
      }
    ]
  },
  {
    id: 12,
    text:'You open the door and there is a secret room in the closet. You see Raven looking through a peephole that looks into the main area of the mansion. She is alive and well. She says she wanted to see who was against her, because she had suspicions of her family. Congratulations, you won the game! If you want to explore different paths, restart the game.',
    options:[
      {
        text:'Congratulations! Play again.',
        nextText: -2
      }
    ]
  }
]

startGame()
