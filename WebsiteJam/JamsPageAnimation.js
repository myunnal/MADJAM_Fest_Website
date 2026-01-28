// Expanding Card Animation for Jams Page
document.addEventListener('DOMContentLoaded', function() {
    // Only run on jams page or if jamblocks section exists
    const jamblocksSection = document.getElementById('jamblocks');
    if (!jamblocksSection) return;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';
    document.body.appendChild(overlay);

    // Get all card containers
    const cardContainers = document.querySelectorAll('#jamblocks .card-container');
    let isExpanded = false;
    let expandedCard = null;

    // Add click handlers to each card
    cardContainers.forEach((container) => {
        const card = container.querySelector('.card');
        const front = container.querySelector('.front');
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'card-close-btn';
        closeBtn.innerHTML = '×';
        front.appendChild(closeBtn);

        // Add expanded content if it doesn't exist
        if (!front.querySelector('.card-expanded-content')) {
            const expandedContent = createExpandedContent(container);
            front.appendChild(expandedContent);
        }

        // Click handler for card
        card.addEventListener('click', function(e) {
            // Don't expand if clicking close button
            if (e.target.classList.contains('card-close-btn')) {
                return;
            }

            if (!isExpanded) {
                expandCard(container);
            }
        });

        // Click handler for close button
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isExpanded) {
                collapseCard();
            }
        });
    });

    // Click overlay to close
    overlay.addEventListener('click', function() {
        if (isExpanded) {
            collapseCard();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isExpanded) {
            collapseCard();
        }
    });

    function expandCard(container) {
        if (isExpanded) return;

        isExpanded = true;
        expandedCard = container;

        // Get card's current position
        const rect = container.getBoundingClientRect();
        
        // Set initial position to current position
        container.style.position = 'fixed';
        container.style.left = rect.left + 'px';
        container.style.top = rect.top + 'px';
        container.style.width = rect.width + 'px';
        container.style.height = rect.height + 'px';
        
        // Add expanding class
        container.classList.add('expanding');
        
        // Activate overlay
        overlay.classList.add('active');
        document.body.classList.add('card-expanded');

        // Trigger expansion after a brief moment
        setTimeout(() => {
            container.classList.remove('expanding');
            container.classList.add('expanded');
        }, 50);
    }

    function collapseCard() {
        if (!isExpanded || !expandedCard) return;

        const container = expandedCard;
        
        // Get original position (approximate, will animate back)
        container.classList.remove('expanded');
        container.classList.add('collapsing');

        // Deactivate overlay
        overlay.classList.remove('active');
        document.body.classList.remove('card-expanded');

        // Reset after animation
        setTimeout(() => {
            container.classList.remove('collapsing');
            container.style.position = '';
            container.style.left = '';
            container.style.top = '';
            container.style.width = '';
            container.style.height = '';
            
            isExpanded = false;
            expandedCard = null;
        }, 600);
    }

    function createExpandedContent(container) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'card-expanded-content';
        
        // Get the card type from background image or class
        const front = container.querySelector('.front');
        const bgImage = front.style.backgroundImage;
        
        let content = '';
        
        if (bgImage.includes('gameblock')) {
            content = `
                <p>The MAD Game Jam competition challenges teams to create video games in 48 hours, 
                based on a theme revealed on the first day of the event. It is an intense space for 
                creation that seeks new, creative approaches to the world of computer games through the 
                intersection of different areas of knowledge.</p>
                
                <h4>Rules:</h4>
                <ul>
                    <li>The teams develop the games in 48 hours, on a theme revealed on the first day</li>
                    <li>Teams are presented with a panel of juries after about 48 hours</li>
                    <li>The papers are presented in a panel of juries after about 48 hours</li>
                    <li>Candidates can apply alone or in teams of up to 8 members, presenting the ideas they want to support</li>
                </ul>
                
                <p>The presentation of the works after 48 hours will be designed and subject to evaluation, where the 3 best classified will be awarded in addition to being awarded a honorable mentions for non-awarded teams.</p>
            `;
        } else if (bgImage.includes('photoblock')) {
            content = `
                <p>The MAD Photo Jam challenges participants to create an original photographic project in 
                an intensive 48-hour format, based on a theme revealed on the first day of the event. 
                Participants must be fully autonomous in providing the equipment needed to develop their project. 
                The work will be exhibited in exhibition format after the event.</p>
                
                <h4>Rules:</h4>
                <ul>
                    <li>There is only one category, regardless of the technique(s) for uses</li>
                    <li>Work must be original</li>
                    <li>The participants develop the work on a theme that they will only know on the first day</li>
                    <li>Participants must be autonomous in the equipment necessary for the development of the Project. The work will be exhibited in exhibition format after the event.</li>
                    <li>The winner and projected to the public 48 hours later</li>
                    <li>Participants must be autonomous in the equipment necessary for the development of the extreme</li>
                </ul>
                
                <p>The presentation of the works after 48 hours will be designed and subject to evaluation, where the 3 best classified will be awarded in addition to being awarded 4 honorable mentions.</p>
            `;
        } else if (bgImage.includes('animationblock')) {
            content = `
                <p>Open call for intensive artistic creations in motion design and animation, combining diverse techniques to 
                respond to a theme revealed on the first day of the event. These techniques may include both 2D and 3D motion 
                and animation, giving participants the opportunity to explore exclusively digital content over a 48-hour period.</p>
                
                <h4>Rules:</h4>
                <ul>
                    <li>Participants can work individually or in teams</li>
                    <li>The theme will be revealed on the first day of the event</li>
                    <li>Work must be completed within 48 hours</li>
                    <li>Both 2D and 3D techniques are accepted</li>
                    <li>Final presentations will be evaluated by a jury</li>
                </ul>
                
                <p>The best works will be awarded and showcased in a special presentation after the event.</p>
            `;
        } else if (bgImage.includes('videoblock')) {
            content = `
                <p>The MAD Video Jam competition challenges teams to create audiovisual projects within 48 hours on a theme revealed at 
                the event's start. It promotes a creative approach to developing short films, documentaries, ads, experimental videos, 
                music videos, and more.</p>
                
                <h4>Rules:</h4>
                <ul>
                    <li>Teams have 48 hours to complete their project</li>
                    <li>Theme is revealed at the beginning of the event</li>
                    <li>All audiovisual formats are welcome</li>
                    <li>Teams must provide their own equipment</li>
                    <li>Final projects will be screened and evaluated</li>
                </ul>
                
                <p>Winners will be announced after the final screening, with prizes for top teams and honorable mentions.</p>
            `;
        }
        
        contentDiv.innerHTML = content;
        return contentDiv;
    }
});