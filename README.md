# PicoCYOA

Pico Choose Your Own Adnenture is a pico framework for creating interactive fiction written in pure html and Javascript.

Features: 
* Simple to write - use pure html elements
* No compilation - all you need is a text editor
* No bulky framework - only requires a SINGLE js import

## Tutorial

_Please see story.html for a working example_

Stories are defined using custom html elements. Here is an example story section with a title, some content and two possible paths:
```html                               
     <story-segment id="startSegment" show>      
          <segment-title>My section heading if necessary.</segment-title>          
          <segment-subtitle>Subtitle wont show in ToC</segment-subtitle>        
                                                                                
          <segment-content>                                                     
            <p>Content for the section goes here </p>            
          </segment-content>                                                    
                                                                                
          <ul>                                                                  
            <segment-choice target="badEnding"><li>leads to bad ending</li></segment-choice>
            <segment-choice target="goodEnding"><li>leads to good ending</li></segment-choice>
          </ul>                                                                 
                                                           
        </story-segment>                                             
```
Each segment has a unique `id` and story sections are chained together using the `segment-choice` elements.

### Conditional rendering

PicoCYOA affords conditional section rendering of ssegment choices via utilising pure javascript. Using the `condition` property you can show paths only if certain conditions are met, e.g. if the reader has explored certain paths.

```html
<story-segment id="middleSegment">                                      
          <segment-title>middle Segment</segment-title>                         
          <segment-subtitle>we are in the middle of the story</segment-subtitle>                       
          <segment-content>                                                     
            <p>You can mixin with existing html elements and use javascript to manage state.</p>
            <form action="">                                                    
              <input type="button" value="Click me a few times" onclick="scoreAdder(3);"/>
            </form>                                                             
          </segment-content>                                                    
                                                                                
          <ul>                                                                  
            <segment-choice target="badEnding"><li>leads to bad ending</li></segment-choice>
            <segment-choice target="goodEnding"><li>leads to good ending</li></segment-choice>
            <segment-choice target="excellentEnding" condition="{() => currentScore >= 10 }"><li>leads to best ending</li></segment-choice>
          </ul>                                                                 
        </story-segment>                                                        
```
The included script `basicfunctions.js` provides a library of javascript functions for managing state like scores.

### Managing the story

The included `grapher.html` provides the ability to open a story and view the graph of connections between the story segments. This can be usuful to visualise the potential paths in the story. Further the graph shows when you have declared a segment but forgotten to write it!

![Example graph](examplegraph.png)

## Documentation

_full element overview plz_
