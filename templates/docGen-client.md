Introduction to integration documentation

##Pre-requisites

* [XYZ Account]
* [XYZ Pixel ID]
* [Client ID]

##Supported Versions

* [v4]
* [v3]
* [v2 (deprecated)] 

##Tag Configuration
First, go to Tealium's Tag Marketplace and add the {tag name} Tag to your profile ([how to add a Tag?](https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/Tags/ta-p/5016)).

After adding the Tag, configure the below settings:

1. Title: Enter a unique name to identify the Tag. This is important if you are adding multiple instances of this Tag.
2. [Param XYZ]: [insert description here]
3. [Dropdown XYZ]: [insert description here] 
  * [sub-list item #1]: [insert description].
  * [sub-list item #1]: [insert description]. 

##Load Rules
[Load Rules](https://community.tealiumiq.com/t5/1-Getting-Started-Documentation/Load-Rules-Creation/ta-p/9422) determine when and where to load an instance of this Tag on your site.

Recommended Load Rule: REPLACE

##Data Mappings##

Mapping is the process of sending data from a [Data Layer Variable](https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/Variable-Types-formerly-Data-Sources/ta-p/10645#mapping_data_sources) to the corresponding destination variable of the vendor Tag. For instructions on how to map a Variable to a Tag destination, see [Data Mappings](https://community.tealiumiq.com/t5/Tealium-iQ-Tag-Management/Data-Mappings/ta-p/10645#mapping_data_sources).

The destination variables for the {tag name} Tag are built into its Data Mapping tab. Available categories are:

###[Category #1]###

**Destination Name**  | **Description**
------------- | -------------
destination #1| Description
destination #2| Description


###[Category #2]###

**Destination Name**  | **Description**
------------- | -------------
destination #1| Description
destination #2| Description

##Events
Map to these destinations for triggering specific events on a page. To trigger an event,

1. Select an event from the dropdown list. You may choose from the predefined list or create a 'Custom' event. For 'Custom' event, enter a name with which to identify it.
2. In the 'Trigger' field, enter the value of the Variable being mapped.
3. To map more events, click the + button and repeat steps #1 and #2.
4. Click 'Apply'.

The event triggers when the supplied value is found in the Data Layer.

**Destination Event**  | **Description**
------------- | -------------
destination #1| Description
destination #2| Description

##E-Commerce
Since the {tag name} Tag is e-commerce enabled, it will automatically use the default E-Commerce Extension mappings. Manually mapping in this category is generally not needed unless:

* you want to override any Extension mappings
* your desired ecommerce variable is not offered in the Extension

**Destination Name**  | **Description**| **E-Commerce Extension Variable**
------------- | -------------|---
Order ID   | Description  |_corder
Sub Total| Description  | _csubtotal

##Release Notes

### {VERSION NUM XX/XX/XXXX}

* note 1
* note 2

##Vendor Documentation

* [insert doc link]
* [insert doc link]
