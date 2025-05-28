// Default potions
        const defaultPotions = [
            // { id: 1, name: "Heiltrank", color: "#e74c3c", quantity: 3, icon: "❤️" },
            // { id: 2, name: "Manatrank", color: "#3498db", quantity: 2, icon: "✨" },
            // { id: 3, name: "Gifttrank", color: "#2ecc71", quantity: 1, icon: "☠️" },
            // { id: 4, name: "Stärketrank", color: "#f1c40f", quantity: 2, icon: "💪" },
            // { id: 5, name: "Unsichtbarkeitstrank", color: "#9b59b6", quantity: 1, icon: "👁️" },
            // { id: 6, name: "Feuerwiderstandstrank", color: "#e67e22", quantity: 2, icon: "🔥" }
        ];
        
        // Load potions from local storage or use defaults
        let potions = JSON.parse(localStorage.getItem('dndPotions')) || defaultPotions;
        
        // Save potions to local storage
        function savePotions() {
            localStorage.setItem('dndPotions', JSON.stringify(potions));
        }
        
        // Generate potion cards
        function renderPotions() {
            const container = document.getElementById('potion-container');
            container.innerHTML = '';
            
            potions.forEach(potion => {
                const card = document.createElement('div');
                card.className = 'potion-card';
                card.innerHTML = `
                    <div class="potion-header">
                        <div class="potion-icon" style="background-color: ${potion.color}">${potion.icon}</div>
                        <h3 class="potion-name">${potion.name}</h3>
                    </div>
                    <div class="potion-count">
                        <button onclick="decreasePotion(${potion.id})" ${potion.quantity <= 0 ? 'disabled' : ''}>-</button>
                        <span>${potion.quantity}</span>
                        <button onclick="increasePotion(${potion.id})">+</button>
                    </div>
                    <button class="use-button" onclick="usePotion(${potion.id})" ${potion.quantity <= 0 ? 'disabled' : ''}>Trank verwenden</button>
                `;
                container.appendChild(card);
            });
        }
        
        // Increase potion quantity
        function increasePotion(id) {
            const potion = potions.find(p => p.id === id);
            if (potion) {
                potion.quantity++;
                savePotions();
                renderPotions();
            }
        }
        
        // Decrease potion quantity
        function decreasePotion(id) {
            const potion = potions.find(p => p.id === id);
            if (potion && potion.quantity > 0) {
                potion.quantity--;
                savePotions();
                renderPotions();
            }
        }
        
        // Use a potion (same as decrease)
        function usePotion(id) {
            decreasePotion(id);
        }
        
        // Add a new potion
        function addPotion() {
            const nameInput = document.getElementById('potion-name');
            const quantityInput = document.getElementById('potion-quantity');
            const selectedColor = document.querySelector('.color-option.selected').dataset.color;
            const selectedIcon = document.querySelector('.icon-option.selected').dataset.icon;
            
            const name = nameInput.value.trim();
            const quantity = parseInt(quantityInput.value);
            
            if (!name) {
                alert('Bitte gib einen Namen für den Trank ein.');
                return;
            }
            
            if (isNaN(quantity) || quantity < 1) {
                alert('Bitte gib eine gültige Anzahl ein (mindestens 1).');
                return;
            }
            
            const newId = potions.length > 0 ? Math.max(...potions.map(p => p.id)) + 1 : 1;
            
            potions.push({
                id: newId,
                name: name,
                color: selectedColor,
                quantity: quantity,
                icon: selectedIcon
            });
            
            savePotions();
            renderPotions();
            
            // Reset form
            nameInput.value = '';
            quantityInput.value = '1';
        }
        
        // Handle color selection
        document.getElementById('potion-colors').addEventListener('click', (e) => {
            if (e.target.classList.contains('color-option')) {
                document.querySelectorAll('.color-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                e.target.classList.add('selected');
            }
        });
        
        // Handle icon selection
        document.getElementById('potion-icons').addEventListener('click', (e) => {
            if (e.target.classList.contains('icon-option')) {
                document.querySelectorAll('.icon-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                e.target.classList.add('selected');
            }
        });
        
        // Add button event listener
        document.getElementById('add-potion-button').addEventListener('click', addPotion);
        
        // Initial render
        renderPotions();