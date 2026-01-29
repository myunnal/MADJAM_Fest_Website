document.addEventListener('DOMContentLoaded', function() {
    const jamBlocks = document.querySelectorAll('.jam-block');
    const jamBlocksContainer = document.getElementById('jamblocks');
    
    jamBlocks.forEach(block => {
        block.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const isExpanded = this.classList.contains('expanded');
            
            jamBlocks.forEach(b => {
                b.classList.remove('expanded');
            });
            
            jamBlocksContainer.classList.remove('has-expanded');
            const oldWrapper = jamBlocksContainer.querySelector('.non-expanded-wrapper');
            if (oldWrapper) {
                while (oldWrapper.firstChild) {
                    jamBlocksContainer.appendChild(oldWrapper.firstChild);
                }
                oldWrapper.remove();
            }

            if (!isExpanded) {
                this.classList.add('expanded');
                jamBlocksContainer.classList.add('has-expanded');
                
                const wrapper = document.createElement('div');
                wrapper.className = 'non-expanded-wrapper';
                
                jamBlocks.forEach(b => {
                    if (!b.classList.contains('expanded')) {
                        wrapper.appendChild(b);
                    }
                });
                
                jamBlocksContainer.appendChild(wrapper);
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.jam-block')) {
            jamBlocks.forEach(b => {
                b.classList.remove('expanded');
            });
            jamBlocksContainer.classList.remove('has-expanded');
            
            const wrapper = jamBlocksContainer.querySelector('.non-expanded-wrapper');
            if (wrapper) {
                while (wrapper.firstChild) {
                    jamBlocksContainer.appendChild(wrapper.firstChild);
                }
                wrapper.remove();
            }
        }
    });
});