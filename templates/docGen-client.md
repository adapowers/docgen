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
First, go to the Tag Marketplace and add the {tag name} tag (see: [How to Add a Tag](https://community.tealiumiq.com/t5/iQ-Tag-Management/Tags/ta-p/5016#toc-hId-678473855)).

After adding the tag, configure these settings:

* **Title**: Enter a unique name to identify the tag. This is important if you are adding multiple instances of this tag.
* [Param XYZ]: [insert description here]
* [Dropdown XYZ]: [insert description here] 
  * [sub-list item #1]: [insert description].
  * [sub-list item #1]: [insert description]. 

##Load Rules
[Load rules](https://community.tealiumiq.com/t5/iQ-Tag-Management/Load-Rules/ta-p/5098) determine when and where to load an instance of this tag on your site.

Recommended Load Rule: REPLACE

##Data Mappings##

Mapping is the process of sending data from a [data layer variable](https://community.tealiumiq.com/t5/iQ-Tag-Management/Data-Layer-Variables/ta-p/9427) to the corresponding destination variable of the vendor tag. For instructions on how to map a variable to a tag destination, see [data mappings](https://community.tealiumiq.com/t5/iQ-Tag-Management/Data-Mappings/ta-p/10645).

The destination variables for the {tag name} tag are built into its data mapping tab. Available categories are:

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
Map to these destinations for triggering specific events. To trigger an event:

1. Select an event from the dropdown list. You may choose from the predefined list or create a 'Custom' event. For 'Custom' event, enter a name with which to identify it.
2. In the **Trigger** field, enter the value of the variable being mapped.
3. To map more events, click the + button and repeat steps #1 and #2.
4. Click **Apply**.

The configured events trigger when the supplied value is found in the event data.

**Destination Event**  | **Description**
------------- | -------------
destination #1| Description
destination #2| Description

##E-Commerce
Since the {tag name} tag is e-commerce enabled, it will automatically use the default [E-Commerce Extension](https://community.tealiumiq.com/t5/iQ-Tag-Management/E-commerce-Extension-Installation-and-Setup/ta-p/11927) mappings. Manually mapping in this category is generally not needed unless (a) you want to override any extension mappings or (b) your desired e-commerce variable is not offered in the extension.

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
