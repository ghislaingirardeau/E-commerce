# E-commerce from community to business

plateforme e-commerce for bulk purchase.

1- Purpose / values
	- Give the oppportunity for the community / local producer to export local and hand made product
	- Extand the visibility of their products
	- Value the handmade, the community, where the money is redistributed
	- For purchaser, to get quality, unique and handmade product. Contribute to a sustainable market
	- share the profit from production to the plateform.
	
2- target
	#from :
	- handmade product / localy product / family home business
	- community of 3 differents countries
	#to :
	- small artisanal business and supplier, hand made creators, independant, artist creators

3- strategy
	- ship the product one time per year to france = long time delivery -> purchase preview 6 months
	- 2 time per year around thai, cambo, indonesia
	- product localy made : bracelet, earing, essential oil, spice, lotion, bamboo product, carillon, cloth, hammock...
	- 2 types : craft from community / artisanal from localy produce 
	- collect the money on stripe from the deposit => buy the product and delivery => rest of benefits to the plateform but define
	a maximu rate
	- show different way to use a product
	- products have to be easely shipping so less weight
	- define a shipping strategy: base on the weight and the containers. country to country / inside the country

	-pricing: production cost, shipping, delivery, website hosting
	- free for the community to put the products
	- free access for the supplier
	- possibility to made a donation for the supplier
	- bulk purchase to minimize the cost

3- needs and ressource
	- find a list of product to start
	- delay from the producers
	- shipping partner

4- development
	- e-commerce plateform : stripe payment to collect deposit and total payment
	- category of product available : bracelet, earing, essential oil, spice, lotion, bamboo product, carillon...
	- json product : name, description, community, price, weight, dimension, material, colors
	- ON ADD a new product, call stripe API and add the product
	- map where the product come from
	- for the payment => redirect to stripe page to pay
	- community partner page
	- 5 types of language : english, french, thai, khmer, indonesia
		#each country as a representative : lily, phasy, someone in france, paul in uk...
	- book a certain amount of product => pay a deposit (the cost to buy localy the product) => payback all at the delivery
	- Each product link to the village community => each community has a description, purpose, how it made, to whom it help, evolve and 
	benefits of this commerce inside the community...
	- nav :
		.community => product from this community
		.list product => this commmunity made

	- tech: vuetify, stripe, i18n, 

5- extension possible
	- any traveler / researcher can register and sell his own community product => add a chart and policy, admin to approve the subscriber
	- possibility for the community to propose product if respect the policy

