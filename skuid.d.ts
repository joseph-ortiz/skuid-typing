/**
 * TypeScript definitions for the Skuid JavaScript Framework for Salesforce.
 *
 * Skuid: https://www.skuid.com/
 * Skuid API: http://help.skuid.com/m/11720/c/51305
 *
 * Salesforce: https://www.salesforce.com/
 *
 * Authored by Patrick Toy <https://github.com/patrickjtoy>
 */

/* tslint:disable:interface-name no-any */

interface Attributes {
  type?: string;
  url?: string;
}

interface Result {
  event: string;

  messages: string[];

  initiatorId: string;

  models: {
    [modelName: string]: Model;
  };

  totalsuccess: boolean;

  insertResults: {

    // The 18-digit Salesforce Id of the newly-inserted record
    id: string;

    // The temporary Id of the record before it was saved
    oldId: string;

    /**
     * true if the record was successfully inserted, false if there were errors, whether on the individual record,
     * or, if the "Rollback entire save on any error" option was saved, if there was an error on some other record
     * that was part of the save)
     */
    success: boolean;

    /**
     * an array containing a Message object for any blocking Apex error that occurred on this record, preventing it
     * from being inserted
     */
    errors: Message[];

    /**
     * an array containing a Message object for any non-blocking info or warning messages that were applied to this
     * row using Utils.AddRowWarning(rowIndex,message)
     */
    messages: Message[];

  }[];

  updateResults: {

    // The 18-digit Salesforce Id of the record for which an update was attempted
    id: string;

    /**
     * true if the record was successfully updated, false if there were errors, whether on the individual record,
     * or, if the "Rollback entire save on any error" option was saved, if there was an error on some other record
     * that was part of the save)
     */
    success: boolean;

    /**
     * an array containing a Message object for any blocking Apex error that occurred on this record, preventing it
     * from being updated
     */
    errors: boolean;

    /**
     * an array containing a Message object for any non-blocking info or warning messages that were applied to this
     * row using Utils.AddRowWarning(rowIndex,message)
     */
    messages: Message[];

  }[];

  deleteResults: {
    // The 18-digit Salesforce Id of the record for which an update was attempted
    id: string;

    /**
     * true if the record was successfully updated, false if there were errors, whether on the individual record,
     * or, if the "Rollback entire save on any error" option was saved, if there was an error on some other record
     * that was part of the save)
     */
    success: boolean;

    /**
     * an array containing a Message object for any blocking Apex error that occurred on this record, preventing it
     * from being updated
     */
    errors: boolean;

    /**
     * an array containing a Message object for any non-blocking info or warning messages that were applied to this
     * row using Utils.AddRowWarning(rowIndex,message)
     */
    messages: Message[];
  }[];
}

interface Message {
  /**
   * A user-friendly message
   */
  message: string;

  /**
   * Defines the severity (and thus styling) of the message. One of:
   *    -- <none specified> - Informational message for a normal event. Displayed in blue
   *    -- WARNING - An issue on the page that could cause undesirable behavior. Displayed in yellow
   *    -- ERROR - A problem occurred with a specific operation, forcing the operation to terminate.
   *               Displayed in red
   *    -- FATAL - A problem occurred that has caused severe problems with the entire page, such that
   *               further actions on the page are either not possible or especially dangerous. Displayed
   *               in red
   */
  severity?: "WARNING" | "ERROR" | "FATAL";
}

/**
 * The Skuid Model Condition Metadata Object is built on the server-side and is not a constructible type.
 *
 * Conditions are defined for a particular Model. For more information about defining Conditions in the Page
 * Composer, see Conditions determine the records in your model
 *
 * NOTE: All properties in the Condition Metadata Object should be treated as read-only. Overwriting these
 * values on the rendered page will result in undefined behavior and likely cause unexpected and undesirable
 * results.
 */
interface ConditionMetadata {
  /**
   * The name of the field on which the condition will operate, as defined in the Page Composer.
   */
  field: string;

  /**
   * For a subquery, defines the field on which the subquery will be joined to the parent object, as defined
   * in the Page Composer.
   */
  joinField?: string;

  /**
   * For a subquery, the name of the sObject to query for a value or list of values for the Condition, as
   * defined in the Page Composer.
   */
  joinObject?: string;

  /**
   * When a Condition derives its value from a "Field from another model", the name of the field from which
   * the value will be derived, as defined in the Page Composer.
   */
  mergeField?: string;

  /**
   * The name of the model.Model that acts as the source for a "Field from another Model" condition
   * ("modelmerge"), as defined in the Page Composer.
   */
  model?: string;

  /**
   * The name of the filter as defined in the Page Composer.
   */
  name: string;

  /**
   * A value defined in the Page Composer describing how the Condition will behave if a value could not be
   * derived from a URL parameter (the parameter was missing) or Model (no rows were returned).
   *
   * deactivate - Deactivate this Condition
   * noquery - Abort this Model's Query
   */
  noValueBehavior?: string;

  /**
   * An operator defined in the Page Composer describing how the Condition's field will be compared to a value
   * as defined in the Page Composer.
   *
   * =
   * !=
   * gt - >
   * lt - <
   * gte - >=
   * lte - <=
   * in
   * not in
   * starts with
   * ends with
   * contains
   * does not contain
   * does not start with
   * does not end with
   */
  operator: string;

  /**
   * The default "inactive" state for a Condition, as defined in the Page Composer.
   */
  originalInactive?: boolean;

  /**
   * Conditions defined in the Page Composed which are applied to a subquery which will generate a value or
   * list of values for the current Condition.
   */
  subConditions?: ConditionMetadata[];

  /**
   * A value defined in the Page Composer which describes how multiple subconditions should be combined.
   *
   * Example: "(1 AND 2) OR (3 AND 4)"
   */
  subConditionLogic?: string;

  /**
   * The type of Condition as defined by the "Value Content" picklist in the Page Composer.
   *
   * fieldvalue - Single specified value
   * multiple - Multiple specified values
   * param - URL parameter
   * userinfo - UserInfo of page viewer
   * blank - None - blank value
   * modelmerge - Field from another model
   * join - Result of subquery
   */
  type: string;

  /**
   * NOTE: Not defined by API docs.
   */
  value: string;

  /**
   * NOTE: Not defined by API docs.
   */
  state: string;

  /**
   * NOTE: Not defined by API docs.
   */
  inactive: boolean;

  /**
   * NOTE: Not defined by API docs.
   */
  encloseValueInQuotes: boolean;

}

interface Condition {

  /**
   * Read-only. A value indicating if the Condition is inactive - meaning it will not be applied to the Model.
   * The default value is defined in the Page Composer, but inactive Conditions can be activated via a
   * model.Model's activateCondition function. Likewise, an active Condition may be deactivated via the
   * deactivateCondition function.
   */
  inactive: boolean;

  /**
   * For a Condition with the Value Content set to "Single specified value", a value defined in the Page
   * Composer to which the Condition's field will be compared. This value can be changed at run-time (and the
   * Condition reapplied) to enable dynamic Model filtering.
   */
  value: string;

  /**
   * For a Condition with the Value Content set to "Multiple specified values", an array of values defined in
   * the Page Composer to which the Condition's field will be compared. This value can be changed at run-time
   * (and the Condition reapplied) to enable dynamic Model filtering.
   */
  values: string[];

  /**
   * For a Condition with the Value Content set to "Multiple specified values", an array of values defined in
   * the Page Composer to which the Condition's field will be compared. This value can be changed at run-time
   * (and the Condition reapplied) to enable dynamic Model filtering.
   */
  field: string;

}

/**
 * The Skuid Model Metadata Object is built on the server-side and is not a constructible type. It is loosely
 * based on the Apex DescribeSObjectResult Class, but contains some name changes and Skuid customizations.
 *
 * If the object's metadata could not be accessed, then accessible will evaluate to false and some properties
 * may not be initialized (contain null).
 *
 * NOTE: All properties in the Model Metadata Object should be treated as read-only. Overwriting these values on
 * the rendered page will result in undefined behavior and likely cause unexpected and undesirable results.
 */
interface ModelMetadata {
  /**
   * For valid objects, indicates if the current user can see the sObject. Always evaluates to false for
   * invalid objects. Derived from Salesforce's DescribeSObjectResult.isAccessible().
   */
  accessible: boolean;
}

declare class Model {

  // Indicates whether there are more rows in the dataset beyond the limit requested by the user.
  public canRetrieveMoreRows: boolean;

  /**
   * Represents changes to the Model which have not yet been committed to the database via save( )
   *
   * A simple object mapping of row Ids to rows that have changed. Each row is a simple map of field names to
   * values that have changed.
   *
   * cancel( ) empties changes. If no changes have been made since the last save( ) or cancel( ) , this will
   * be an empty object.
   */
  public changes: { [rowId: string]: any };

  /**
   * Indicates if a row will be created when no records are returned by the Model's query or if the Model is
   * set not to query for records on page load, as defined in the Page Composer.
   */
  public createRowIfNoneFound: boolean;

  /**
   * Defines the logic to use when combining the Model conditions. If no conditionLogic is specified, Skuid
   * will combine all conditions using AND logic, e.g. 1 AND 2 AND ...
   *
   * Example: "(1 AND 2) OR (3 AND 4)"
   */
  public conditionLogic: string;

  /**
   * An array of Condition Metadata Objects associated with the Model.
   */
  public conditions: ConditionMetadata[];

  /**
   * An array of rows within the model. To retrieve this array directly, use model.getRows(). Each element
   * within the array is a simple map of field names to values.
   */
  public data: any[];

  /**
   * Read Only. Use getRowById( ) to request a particular row by its Id and createRow( ) or adoptRow( ) to add
   * new data to a Model. Direct use of this property is not recommended.
   *
   * For the data array, see the documentation for the Skuid Model Metadata Object.
   */
  public dataMap: { [rowId: string]: any };

  /**
   * Read-only. Indicates if the Model query should be run on page load. Defaults to true, but can be
   * overridden in the Page Composer.
   */
  public doQuery: boolean;

  /**
   * An array of Field Metadata Objects, one for each field explicitly defined in the Model. For example, a
   * Model with three fields, two from the object, "Name" and "CustomField__c", and one from a lookup
   * relationship, "skuid__AttachmentId__c" from the sObject "skuid__Image__c" via the relationship
   * "Image__r", would have three elements in this array.
   *
   * Note: Unlike the data and dataMap properties, an object's Id field is not included unless explicitly
   * included in the Model.
   *
   * Fields are not guaranteed to be in any particular order.
   */
  public fields: FieldMetadata[];

  /**
   * Read Only. A simple object map of field names to Skuid Model Field Metadata Objects.
   *
   * It is recommended to use getField( ) to request Field Metadata for a particular Field by its Name, rather
   * than directly accessing fieldsMap.
   *
   * You can access the Field Metadata either by standard hierarchical objects (i.e.
   * fieldsMap.Object__r.FieldName) or by using the fully qualified name via array syntax (i.e.
   * fieldsMap['Object__r.FieldName']).
   */
  public fieldsMap: { [fieldName: string]: FieldMetadata };

  /**
   * An array of Field Metadata Objects used to group an aggregate Model. For basic Models, this property is
   * null.
   */
  public groupByFields: FieldMetadata[];

  /**
   * A description of the grouping method. One of:
   * -- "simple"
   * -- "rollup"
   */
  public groupByMethod: string;

  /**
   * Read Only. Indicates if the Model contains changes that have not been committed to the database.
   */
  public hasChanged: boolean;

  /**
   * The unique identifier assigned to the Model in the Skuid Page Composer.
   */
  public id: string;

  /**
   * The "Fields to Order Records By Clause" defined from the Page Composer. Defines the "ORDER BY" clause in
   * the Model's generated SOQL query.
   */
  public orderByClause: string;

  /**
   * A corollary to the changes property. Contains the original value for each field value change which has
   * not yet been committed to the database.
   *
   * A simple object mapping of row Ids to rows that have changed. Each row is a simple map of field names to
   * the original values before they were changed.
   */
  public originals: { [rowId: string]: any };

  /**
   * Indicates whether the Model should be treated as readonly.
   */
  public readonly: boolean;

  /**
   * An integer value indicating the maximum number of rows to fetch from the database, as defined in the Page
   * Composer. If the value given was less than 0, then the default is 1. If no value was given, then value
   * will be null (and no limit will be placed on the query).
   */
  public recordsLimit: number;

  /**
   * Read Only. A simple object map of Skuid Unique IDs to ui.Editor objects registered with the Model.
   */
  public registeredEditors: { [uniqueId: string]: Editor };

  /**
   * Read Only. A simple object map of Skuid Unique IDs to ui.FIeld objects registered with the Model.
   */
  public registeredFields: { [uniqueId: string]: Field };

  /**
   * Read Only. A simple object map of Skuid Unique IDs to ui.Item objects registered with the Model.
   */
  public registeredItems: { [uniqueId: string]: Item };

  /**
   * Read Only. A simple object map of Skuid Unique IDs to ui.List objects registered with the Model.
   */
  public registeredLists: { [uniqueId: string]: List };

  /**
   * The complete generated SOQL statement used to populate the Model's data, including requested fields and
   * conditions, as well as any GROUP BY, ORDER BY and LIMIT clauses.
   */
  public soql: string;

  /**
   * The Model Type as defined in the Page Builder. One of:
   *
   * For Aggregate Models: "aggregate"
   * For Basic Models: in most cases null, though under some circumstances a zero-length string ("")
   */
  public type: string;

  /**
   * NOTE: Not defined in API docs.
   *
   * Used in programmatically creating a new model.Model
   */
  public objectName: string;

  /**
   * NOTE: Not defined in API docs.
   */
  constructor(xmlDoc?: XMLDocument);

  /**
   * Removes a row from a Model without requesting that it be deleted from the database.
   *
   * When this function is called, the row will be removed from the data array, the dataMap, and the changes
   * and originals maps. The Item associated with the row will be removed from the registeredItems array. Any
   * Fields associated with the row will be removed from the registeredFields array. Any Lists that contained
   * the Item will be notified that the Item was deleted (via the handleRowDeletion function). Finally, the
   * hasChanged property will be reassessed to determine whether the Model still has changes.
   *
   * NOTE: Attempting to abandon a row from another Model or the clone of a row is unsupported and may cause
   * unexpected behavior.
   *
   * @return <Row> The abandoned row object.
   */
  public abandonRow<T>(

    /**
     * The row object to be removed from the Model. The row object itself must belong to the Model. For
     * example, the row object was retrieved using getRowById() or getFirstRow().
     */
    row: T

  ): T;

  /**
   * Removes all rows from the Model, and cancels all changes. Fires handleDataRefresh() on registered
   * ui.Editors and publishes the 'models.loaded' event for the Model. Identical to emptyData().
   */
  public abandonAllRows(): void;

  /**
   * Activates a Condition so that it will be applied to future queries on this Model.
   *
   * Use getConditionByName() to retrieve a Condition.
   *
   * To immediately apply the Condition after activating it, call updateData().
   *
   * NOTE: Use activateCondition() for "toggle" style Conditions. If the Condition uses a value (such as
   * filtering by Product Family on the Product2 sObject), then use setCondition().
   */
  public activateCondition(

    // The Condition to activate.
    condition: Condition,

    /**
     * Optional. If true, and if the Condition has a name, then the Skuid Personalization Framework will
     * store the value of this Condition indefinitely (if the Page's Personalization Mode is set to
     * Server-side) or for the duration of the browser session (if the Page's Personalization Mode is
     * Client-side) so that the Condition's current value will be pulled from the stored value for the
     * running User the next time that the page is loaded.
     */
    affectPersonalization?: boolean

  ): void;

  /**
   * Reverts all changes made to this model since it was last saved or updated, using values stored in
   * originals and emptying changes. Unsaved newly-created rows that are flagged for deletion are immediately
   * removed from data.
   */
  public cancel(): Model;

  // Creates a new row and attaches it to this model.
  public createRow(options: {

    /**
     * Optional. By default, createRow prepends new rows to the Model's data. if doAppend is set to true,
     * however, then this row will be added to the end of the Model's data
     */
    doAppend?: boolean,

    /**
     * Optional, defaults to false. If true, then any ui.Items created in response to this new row's
     * creation will be placed into Edit mode initially, rather than Read mode.
     */
    editModeForNewItems?: boolean,

    /**
     * Optional. Condition objects that should be applied to the new row in addition to any active
     * Conditions already on the model
     */
    additionalConditions?: Condition[]

  }): any;

  /**
   * Deactivates the given model.Condition so that it will not be applied to future queries on this
   * Model.
   *
   * Use getConditionByName() to retrieve a Condition.
   */
  public deactivateCondition(

    // The Condition to deactivate
    condition: Condition,

    /**
     * Optional. If true, and if the Condition has a name, then the Skuid Personalization Framework will
     * store the value of this Condition indefinitely (if the Page's Personalization Mode is set to
     * Server-side) or for the duration of the browser session (if the Page's Personalization Mode is
     * Client-side) so that the Condition's current value will be pulled from the stored value for the
     * running User the next time that the page is loaded.
     */
    affectPersonalization?: boolean

  ): void;

  /**
   * Marks the given row for deletion. The row will not be deleted from the database until the save( ) method
   * is called.
   */
  public deleteRow<r>(row: r): void;

  /**
   * Removes all rows from the Model, and cancels all changes. Fires handleDataRefresh() on registered
   * ui.Editors and publishes the 'models.loaded' event for the Model. Identical behavior to
   * abandonAllRows().
   */
  public emptyData(): void;

  // Searches this Model for a Condition whose name property equals conditionName.
  public getConditionByName(

    /**
     * The name of the Condition, as defined in the Page Composer. A Condition's State must be set to
     * "Filterable, Default On/Off" in order for a name to be given to the Condition.
     */
    conditionName: string,

    /**
     * Optional, defaults to false. When false, getConditionByName only searches top-level Conditions for
     * name matches. If true, getConditionByName will search Sub-Conditions as well, returning the first
     * Condition or Sub-Condition whose name is conditionName.
     */
    searchSubconditions?: boolean

  ): Condition | boolean;

  // Returns the first row in this model's data array.
  public getFirstRow<R>(): R;

  /**
   * Returns the row in this model identified by the given id or false if no matching row is found.
   *
   * @param id<string>
   *
   * @return <Row | boolean>
   */
  public getRowById<R>(

    /**
     * The Id of the row. Typically an 18-character Salesforce Id, though may also be a Skuid Unique ID for
     * newly created rows that have not been added to the database yet.
     */
    id: string

  ): R | boolean;

  /**
   * Returns all rows in this Model's data array. This is the recommended way to retrieve all rows in a Model.
   */
  public getRows<R>(): R[];

  /**
   * Checks whether there are any unsaved changes associated with a particular row in a Model.
   */
  public isRowChanged<T>(row: T): boolean;


  /**
   * Checks whether the given row is a new row or existing row in SF
   */
  public isRowNew<T>(row: T): boolean;

  /**
   * If the Model had a LIMIT clause applied to it and there are rows in the database which were not fetched
   * in a prior query then loadNextOffsetPage fetches the next "set" of data based on the LIMIT clause size.
   */
  public loadNextOffsetPage<T>(callback?: () => T): void;

  /**
   * Sends all changes to this model to the server.
   */
  public save(options?: { callback?: <R>(result: Result) => R }): JQueryPromise<Result>;

  /**
   * Requests an update (or "refresh") for this Model from the server.
   *
   * This function will throw a JavaScript error if there are unsaved changes in the Model. To cancel unsaved
   * changes, see cancel().
   */
  public updateData<T>(callback?: () => T): JQueryPromise<T>;

  /**
   * NOTE: Not defined in API docs.
   *
   * Populates various internal properties on a Model.
   */
  public initialize(): Model;

  /**
   * NOTE: Not defined in API docs.
   *
   * This lets Skuid know that this Model exists, and allows Components to bind to it.
   */
  public register(): void;

  /**
   * Sets the value of a Condition on the Model and activates the Condition so that it will be applied to
   * future queries on this Model.
   *
   * Use getConditionByName() to retrieve a Condition.
   *
   * To immediately apply the Condition after activating it, call updateData().
   *
   * NOTE: Use setCondition() for Conditions that filter on a specific value, such as filtering by Product
   * Family on the Product2 sObject. For "toggle" style Conditions, use activateCondition().
   */
  public setCondition(

    // The Condition to set and activate.
    condition: Condition,

    // The Condition to set and activate.
    value: any,

    /**
     * Optional. If true, and if the Condition has a name, then the Skuid Personalization Framework will
     * store the value of this Condition indefinitely (if the Page's Personalization Mode is set to
     * Server-side) or for the duration of the browser session (if the Page's Personalization Mode is
     * Client-side) so that the Condition's current value will be pulled from the stored value for the
     * running User the next time that the page is loaded.
     */
    affectPersonalization?: boolean

  ): void;

  /**
   * Requests an update (or "refresh") for this Model from the server.
   *
   * This function will throw a JavaScript error if there are unsaved changes in the Model. To cancel unsaved
   * changes, see cancel().
   *
   * NOTE: The returned Promise object is resolved upon completion of the update operation.
   */
  public updateData<T>(

    // A function to be executed upon completion of the update operation.
    callback?: () => T

  ): JQueryPromise<T>;

  /**
   * Updates the value of the given row and fields, then notifies all registered UI elements that changes took
   * place.
   *
   * NOTE: If updating several rows within a loop, it is much more efficient to use the updateRows() function.
   *
   * Changes made will not be sent to the server until the save( ) method is called.
   *
   * Returns the updated row object.
   */
  public updateRow<T>(

    // The row object to update. (Only the Id field is required.)
    row: T,

    // A simple object map of one or more API field names to values.
    updates: any,

    // OPTIONAL. A simple object map of additional settings to pass in to this method call.
    options?: {

      /**
       * The page-unique identifier of the Component, Model, ui.Field, ui.Item, ui.List,
       * or ui.Editor that initiated this updateRow() call, as obtainable via a call to .id() or a
       * reference to ._GUID on the initiating object. This is essential to use when using updateRow()
       * from within a Custom Field Renderer Snippet, in order to prevent infinite rendering loops, since
       * the render() method is called on ui.Field objects whenever their associated row has had an
       * update on the associated field. For example if you use updateRow() the Name field on an Account
       * row all ui.Fields associated with that row and the Name field will have their render()
       * method called after the update has been applied to the row in the Model.
       */
      initiatorId: string;

    }

  ): T;

}

/**
 * An Editor represents a connection to a Model. It provides a way of issuing changes and receiving
 * notifications about updates. An Editor is usually associated with a particular control, such as a textbox,
 * but may also represent an abstract relationship within memory, such as an in-line snippet which should
 * receive notifications about changes to a Model without actually rendering a control to edit the Model.
 */
declare class Editor {

  /**
   * The root node containing the UI for the Editor. For instance, in a Table, element would refer to the
   * Table component's jQuery-wrapped top-level <div> element.
   *
   * Note: The Element associated with a Editor will have a reference to the Editor stored in the jQuery
   * object data attribute. For example, to get at the Editor corresponding to a Table component with Id
   * "table-id", you could do $('#table-id').data('object').
   */
  public element: HTMLElement;

  public lists: List[];

  /**
   * Instantiates a new editor. parentElement is the parent dom element that this editor will attach itself
   * to.
   *
   * @param parentElement<HTMLElement>
   * @param options<Options.Editor>
   *
   * @return <ui.Editor>
   */
  constructor(
    parentElement: JQuery,
    options: {

      /**
       * showSaveCancel property will tell the editor whether or not to create a save and cancel
       * button for this editor.
       */
      showSaveCancel: boolean;

      showHeader?: boolean;

    }
  );

  /**
   * Indicates to a Model that this editor will be editing it. Once registered, an Editor will be notified
   * when changes are made to the Model. If a change is made, handleChange() will be called. If new data comes
   * in from the server, handleDataRefresh() will be called. If the model is saved or cancelled, handleSave()
   * or handleCancel() will be called.
   *
   * @param model<model.Model>
   *
   * @return <void>
   */
  public registerModel(model: Model): void;

  /**
   * Saves all models associated with this editor.
   *
   * @return <void>
   */
  public save(): void;

  /**
   * Cancels all models associated with this editor.
   *
   * @return <void>
   */
  public cancel(): void;

  /**
   * Clears out all error / warning / info messages that an Editor is currently displaying, removing the
   * messages from the Editor's internal store of messages and visibly removing them from the Editor's
   * messages area in the DOM.
   *
   * @return <void>
   */
  public clearMessages(): void;

  /**
   * Used for adding error, warning, or informational messages to an Editor's UI. Called internally by
   * model.Model.prototype.save( ) when there are missing required fields, or when there's a save
   * problem. are always dealt with at the ui.Editor level.
   *
   * You can use this method to add custom error, warning, or informational messages to a particular Editor.
   *
   * Any messages passed in to handleMessages are added to an internal Editor messages list if and only if the
   * messages have not already been added --- that is, if the text of the message is NOT identical to a
   * message that the Editor is already displaying. Rather, any duplicate messages passed in will cause a
   * number to be added to the message DOM element indicating how many times a duplicate message has been
   * processed.
   *
   * All types of messages can be removed by the user simply by clicking on the message's generated DOM node.
   * All messages are displayed in a .nx-message DOM node and added to a .nx-messages DOM container.
   *
   * @param messages<Array<{ message<string>, severity<string> }>>
   * @param otherData<{ initiatorId<string> }>
   *
   * @return <void>
   */
  public handleMessages(

    /**
     * An array of objects.
     */
    messages: Message[],

    /**
     * An object defining additional parameters used by Editors for properly displaying messages.
     */
    otherData?: {

      /**
       * the Unique ID of an Editor object (obtained via the _GUID property). If initiatorId is provided,
       * then ONLY the Editor whose Unique ID equals initiatorId will actually display the provided
       * messages --- otherwise, all Editors upon which handleMessages was called will display all of the
       * messages provided. This is not used much in custom development, but it is used internally by
       * Skuid to prevent all Editors from displaying errors initiated by any other Editor (which would be
       * a visual mess).
       */
      initiatorId: string;

    }

  ): void;

  /**
   * Called at the end of model.Model.prototype.save( ) / model.save([models]). By default, this
   * re-enables the Save/Cancel buttons for an Editor and removes any "Saving..." processing messages, so it
   * is recommended that if you override this method, you should first call the prototype via
   * ui.Editor.prototype.handleSave.call(editor, totalSuccess);
   */
  public handleSave(

    /**
     * Indicates if all records for which a save was attempted were successfully inserted, updated, or
     * deleted (as requested). If there were any errors on any Model, then totalSuccess will be false.
     */
    totalSuccess: boolean

  ): void;

  /**
   * Called at the end of model.Model.prototype.cancel( ) / model.cancel([models]). By default,
   * this disables the Save/Cancel buttons for an Editor and removes any "Saving..." processing messages, so
   * it is recommended that if you override this method, you should first call the prototype.
   *
   * @return <void>
   */
  public handleCancel(): void;

  /**
   * Called after a model.Model object, with which the current Editor is registered, has completed
   * updating a row (initiated via updateRow ( )) or creating a row (initiated via createRow ( )).
   *
   * By default, this enables the Save/Cancel buttons for an Editor and disables Filters and Search on any
   * ui.List objects (e.g. Tables, Queues). If overriding this function, it is highly recommended that
   * you first call the prototype.
   *
   * @return <void>
   */
  public handleChange(

    /**
     * contains two properties
     */
    changeInfo: {

      /**
       * true if the Model had any changes prior to updateRow / createRow being called
       */
      hadPriorChanges: boolean;

      /**
       * a mapping of changed values by field API name, by row Id, or a simple map of changed values by
       * field API name if only one row was changed.
       */
      changes: any;

    }

  ): void;

  /**
   * Called at the end of model.Model.prototype.updateData( ) or model.Model.prototype.load() on
   * any Editors registered on a Model.
   *
   * This method has no default prototype method, however various Components provide implementations of it,
   * for instance Calendar's implementation of handleDataRefresh automatically redraws its Event Sources in
   * response to new skuid.model.Model data, therefore it would be best to call the prototype handleDataRefresh, if it
   * exists, before writing any custom functionality of your own.
   */
  public handleDataRefresh(): void;

  /**
   * NOTE: This method is not documented in the skuid API, it could change or stop working at any moment.
   * Consider this before deciding to rely on this method.
   */
  public id(): number;

}

/**
 * Metadata about the field.
 *
 * The Skuid Model Field Metadata Object is built on the server-side and is not a constructible type. It is
 * loosely based on the Apex DescribeFieldResult Class, but contains some name changes and Skuid
 * customizations.
 *
 * NOTE: All properties in the Field Metadata Object should be treated as read-only. Overwriting these
 * values on the rendered page will result in undefined behavior and likely cause unexpected and undesirable
 * results.
 */
interface FieldMetadata {
  /**
   * Indicates if the current user can see this field. Derived from Salesforce's
   * DescribeFieldResult.isAccessible().
   */
  accessible?: boolean;

  /**
   * Indicates if this field is an Auto Number. Derived from Salesforce's
   * DescribeFieldResult.isAutoNumber().
   */
  autoNumber?: boolean;

  /**
   * Indicates if this field is a custom formula field. Derived from Salesforce's
   * DescribeFieldResult.isCalculated().
   */
  calculated?: boolean;

  /**
   * The name of the controlling field for a PICKLIST or MULTIPICKLIST field. Derived from Salesforce's
   * DescribeFieldResult.getController().
   */
  controllingField?: string;

  /**
   * Indicates if the current user can create the field.
   *
   * For fields that belong to a readonly Model or represent the result of an aggregate function,
   * createable will always evaluate to false.
   *
   * Derived from Salesforce's DescribeFieldResult.isCreateable().
   */
  createable?: boolean;

  /**
   * The default value for this field. Derived from Salesforce's DescribeFieldResult.getDefaultValue()
   */
  defaultValue?: any;

  /**
   * For an Integer field, represents the maximum number of digits. Null for non-Integer fields. Derived
   * from Salesforce's DescribeFieldResult.getDigits().
   */
  digits?: number;

  /**
   * One of the Salesforce DisplayType enum values or, for DATETIME values displayed as DATE values,
   * "DATE".
   */
  displaytype?: string;

  /**
   * Indicates if the current user can edit the field.
   *
   * For fields that belong to a readonly Model or represent the result of an aggregate function,
   * createable will always evaluate to false.
   *
   * Derived from Salesforce's DescribeFieldResult.isUpdateable().
   */
  editable?: boolean;

  /**
   * Indicates if the field can be used as part of the filter criteria of a WHERE statement. Derived from
   * Salesforce's DescribeFieldResult.isFilterable( ).
   */
  filterable?: boolean;

  /**
   * An aggregation function to apply to the field in a GROUP BY query. Expected values are:
   *
   * -- null (the query is not aggregated)
   * -- "COUNT"
   * -- "COUNT_DISTINCT"
   * -- "SUM"
   * -- "MAX"
   * -- "MIN"
   * -- "AVG"
   */
  function?: string;

  /**
   * Indicates if the field can be included in the GROUP BY clause of a SOQL query. Derived from
   * Salesforce's DescribeFieldResult.isGroupable().
   */
  groupable?: boolean;

  /**
   * Indicates if the field has been formatted for HTML and should be encoded for display in HTML. Derived
   * from Salesforce's DescribeFieldResult.isHtmlFormatted().
   */
  htmlFormatted?: boolean;

  /**
   * The field name used in Apex. Derived from Salesforce's DescribeFieldResult.getName().
   */
  id: string;

  /**
   * The context of the field-level help. Derived from Salesforce's
   * DescribeFieldResult.getInlineHelpText().
   */
  inlineHelpText?: string;

  /**
   * The text label that is displayed next to the field in the Salesforce user interface.  Derived from
   * Salesforce's DescribeFieldResult.getLabel().
   */
  label?: string;

  /**
   * For String fields, the maximum allowed number of characters (not bytes). Derived from Salesforce's
   * DescribeFieldResult.getLength().
   */
  length?: number;

  /**
   * Either the id or, for aggregate queries, the alias of the field.
   */
  name?: string;

  /**
   * Indicates if the field is a name field. Derived from Salesforce's DescribeFieldResult.isNameField().
   */
  nameField?: boolean;

  /**
   * Indicates if the field can have multiple types of objects as parents. Derived from Salesforce's
   * DescribeFieldResult.isNamePointing().
   */
  namePointing?: boolean;

  /**
   * For fields identifying a child relationship, defines the field names by which related records will be
   * ordered. This property is ignored for regular fields.
   */
  orderByClause?: string;

  /**
   * An array of picklist value objects. Derived from Salesforce's
   * DescribeFieldResult.getPicklistValues().
   */
  picklistEntries?: {

      /**
       * The value of the Picklist Entry
       */
      value: string;

      /**
       * The display value of the Picklist Entry
       */
      label: string;

      /**
       * The display value of the Picklist Entry
       */
      defaultValue: boolean;

  }[];

  /**
   * For a Double field, the maximum number of digits that can be stored, including all numbers to the
   * left and right of the decimal point. Derived from Salesforce's DescribeFieldResult.getPrecision().
   */
  precision?: number;

  /**
   * Indicates if the field was included in the query. If false, then only the metadata for the field was
   * fetched.
   */
  query?: boolean;

  /**
   * For fields identifying a child relationship, defines the order of the maximum number of records to
   * fetch. This property is ignored for regular fields.
   */
  recordsLimit?: number;

  /**
   * For reference fields, a comma-separated list of the Names of the sObjects which this field refers to.
   * For example, a polymorphic lookup field to the Account, Contact, or User sObjects would be
   * represented as "Account,Contact,User".
   */
  ref?: string;

  /**
   * An array of Model Metadata Objects for the parent objects of this field. Derived from Salesforce's
   * DescribeFieldResult.getReferenceTo().
   */
  referenceTo?: ModelMetadata[];

  /**
   * For reference fields, a comma-separated list of the key prefixes of the sObjects which this field
   * refers to. For example, a polymorphic lookup field to the Account, Contact, or User sObjects would be
   * represented as "001,003,005".
   */
  refprefix?: string;

  /**
   * For reference fields, the name of the relationship. Derived from Salesforce's
   * DescribeFieldResult.getRelationshipName().
   */
  rel?: string;

  /**
   * For reference fields, the name of the relationship. Derived from Salesforce's
   * DescribeFieldResult.getRelationshipName().
   */
  relationshipName?: string;

  /**
   * Indicates if a value is required for this field before it can be saved to the database.
   *
   * For fields that belong to a readonly Model or represent the result of an aggregate function or belong
   * to a related object, required will always evaluate to false.
   *
   * Otherwise, if the field is createable by the current user, does not allow null values and does not
   * have a default value, then required will evaluate to true.
   */
  required?: boolean;

  /**
   * For a Double field, the maximum number of decimal digits (digits to the right of the decimal) that
   * will be returned. Derived from Salesforce's DescribeFieldResult.getScale().
   */
  scale?: number;

  /**
   * Indicates if this field can be used in an ORDER BY clause. Derived from Salesforce's
   * DescribeFieldResult.isSortable( ).
   */
  sortable?: boolean;

  /**
   * For a field defining a child relationship in the Model, defines the logic to use when combining the
   * conditions.
   *
   * Example: "(1 AND 2) OR (3 AND 4)"
   */
  subConditionLogic?: string;

  /**
   * For a field defining a child relationship in the Model, an array of Condition Metadata Objects applied to
   * the child relationship.
   */
  subConditions?: ConditionMetadata[];

  /**
   * For a field defining a child relationship in the Model, an array of Field Metadata Objects that describe
   * the fields to include from the child relationship.
   */
  subFields?: FieldMetadata[];

  /**
   * For a field representing a relationship with another sObject, defines the type of relationship. One of:
   * -- No Relationship: in most cases null, though under some circumstances a zero-length string ("")
   * -- Child Relationship: "childRelationship"
   */
  type?: string;
}

/**
 * A Field is an object which represents a single value associated with a record which is stored within an
 * sObject. The Field exposes a value, the context for that value and the record with which the value is
 * associated and, generally, a UI element to edit that field.
 */
declare class Field {
  /**
   * The ui.Editor associated with the field, if any. This will be populated for most standard Skuid
   * Fields (e.g. Fields in a Field Editor or Table).
   */
  public editor: Editor;

  /**
   * $( DOM Element )
   *
   * A jQuery wrapped DOM element representing the parent node for the field. Add HTML content to element to
   * have it displayed in the appropriate place on the screen.
   *
   * Note: Elements directly associated with a Field will have a reference to the Field stored in the jQuery
   * object data attribute. For example, to get at the Field corresponding to the first <td> element in the
   * first row of a Table Component with Id "table-id", you could do $('#table-id tr:first-child >
   * td:first-child').data('object').
   */
  public element: JQuery;

  /**
   * The field API name. e.g. "FirstName", "CreatedBy", "CustomField__c"
   */
  public id: string;

  /**
   * A ui.Item object representing the list item associated with the row to which the current field
   * belongs.
   */
  public item: Item;

  /**
   * The field label as defined by the "Custom Label" property from the Page Composer or as defined by the
   * Salesforce sObject field result metadata.
   */
  public label: string;

  /**
   * Metadata about the field.
   *
   * The Skuid Model Field Metadata Object is built on the server-side and is not a constructible type. It is
   * loosely based on the Apex DescribeFieldResult Class, but contains some name changes and Skuid
   * customizations.
   *
   * NOTE: All properties in the Field Metadata Object should be treated as read-only. Overwriting these
   * values on the rendered page will result in undefined behavior and likely cause unexpected and undesirable
   * results.
   */
  public metadata: FieldMetadata;

  /**
   * The Skuid display mode to use when rendering this Field. One of:
   *
   * -- "read" (read mode, with ability to doubleclick into Edit mode, aka "Inline-Edit Mode")
   * -- "readonly" (read mode, NO ability to doubleclick into Edit mode)
   * -- "edit" (starts out in Edit mode)
   */
  public mode: string;

  /**
   * The model.Model from which the current Field is derived.
   */
  public model: Model;

  /**
   * The field alias. This is usually only used for aggregate queries.
   */
  public name: string;

  /**
   * Indicates if the field is required, as specified either by the Page Composer or the Salesforce field's
   * metadata. Required fields will be wrapped in a red border to indicate that they must have some value in
   * them in order for the corresponding Model to be saved.
   */
  public required: boolean;

  /**
   * The data row that this ui.Field is editing on its model, represented as a JavaScript object
   * containing a simple mapping of field names to field values for the current row. For example, the current
   * row of a Model with fields "Name" and "CustomField__c" would be represented as:
   */
  public row: any;

  /**
   * Instantiates a new Field that can generate an HTML element for displaying / interacting with a particular
   * field on a particular row in a particular model. The Skuid JavaScript equivalent of the <apex:inputField>
   * tag.
   *
   * @return <ui.Field>
   */
  constructor();

  /**
   * Renders the field, creating or modifying field.element, a DOM element. Runs the appropriate field
   * renderer logic based on the specified data field’s metadata and the field's current mode. For instance,
   * if field.id was ‘MailingCity’ on the Account object, and field.mode is 'edit', then the ‘TEXT’ 'edit'
   * renderer would be used. If field.id was ‘CreatedDate’ and field.mode was 'readonly', then the ‘DATETIME’
   * 'readonly' renderer would be used.
   */
  public render(): void;

  /**
   * By default, re-renders the Field. Override this method if using the Field as a Listener and you want to
   * perform some custom logic based on the new value for the Field.
   */
  public handleChange(

    /**
     * newValue (object): the new value that was entered for this Field's row and field in the model.
     * For example, if you call field.model.updateRow(field.row,field.id,'Cheese'), then
     * handleChange("Cheese") would be called on the field.
     */
    newValue: any

  ): void;

}

/**
 * A List represents an abstract collection of related items which can be rendered as a UI element. For example,
 * a List may be rendered as a Table or Queue with rows of data. List contains properties and methods to enable
 * and support common list-related UI features (such as pagination).
 */
interface List {

  // The current page in a paginated List
  currentPage: number;

  // The editor associated with the List.
  editor: Editor;

  /**
   * Renders the List.
   *
   * First, calls any setUp() or beforeRender () functions on the currently-selected List View.
   *
   * Next, determines which Items should be visible, renders these Items if either (a) they not been rendered
   * yet or (b) doNotCache is set to true, otherwise the currently rendered Item is used and shown.
   *
   * Finally, any renderComplete() and tearDown() functions on the currently-selected List View are called.
   */
  render(options: {

    /**
     *  if true, then existing rendered Items are thrown out and each Item that the List determines should
     * be visible is newly rendered. Also, the List's Filters bar will be rebuilt.
     */
    doNotCache: boolean;

    /**
     * if true, and if doNotCache is NOT true, then as part of the render, existing ui.Fields for
     * Items that should be visible will be re-rendered.
     */
    refreshFields: boolean;

    /**
     * If true, then the currentPage of the List is set to 0, and the set of visibleItems will be determined
     * using Page 0 as the starting point.
     */
    resetPagination: boolean;

  }): void;

}

/**
 * An Item represents some logically cohesive data which forms a unit within a List. For example, an Item may be
 * rendered as a row within a Table or Queue.
 */
declare class Item {

  // The List to which this Item belongs.
  public list: List;

  /**
   * The Skuid display mode to use when rendering this Field. One of:
   * -- "read" (read mode, with ability to doubleclick into Edit mode, aka "Inline-Edit Mode")
   * -- "readonly" (read mode, NO ability to doubleclick into Edit mode)
   * -- "edit" (starts out in Edit mode)
   */
  public mode: string;

  constructor(list: List, row: any, options: any);

}

declare class Component {

    // A reference to the jQuery-wrapped DOM element which is the parent element for the component.
    public element: Item;

    /**
     * Read Only. Indicates whether the Component is rendered. If conditional rendering has been defined for the
     * Component, this property will be changed whenever the Component is conditionally rendered / unrendered.
     * Calling render( ) on an un-rendered Component will also set this property to true.
     */
    public isRendered: boolean;

    // The name of a Component's Component Type as defined when the Component Type was registered.
    public type: string;

    /**
     * A jQuery-wrapped XML Element representing the XML used to construct the Component. This property may be
     * undefined for dynamically generated Components generated by passing in just a type name and not a full
     * XML definition to component.factory()
     */
    public xmlDefinition: JQuery;

    // Use component.factory( ) to create new instances of Components.
    constructor();

    // Adds a problem to the page, which is displayed in the Page Problems Wrapper:
    public addProblem(

        // A user-friendly error message
        problem: string

    ): void;

    // Adds multiple problems to the page.
    public addProblems(

        // An array of user-friendly error messages
        problems: string[]

    ): void;

    /**
     * Examines any render conditions defined on a Component and, if all conditions are met, renders the
     * Component, otherwise the Component is unrendered. If no render conditions exist, the Component will
     * always be rendered.
     *
     * @return <component.Component>
     */
    public conditionallyRender(): Component

    /**
     * Return the unique identifier for this Component.
     *
     * @return <string>
     */
    public getId(): string;

    /**
     * Return the type of Component that this is an instance of.
     *
     * @return <string>
     */
    public getType(): string;

    /**
     * Returns the unique identifier for this Component.
     *
     * @return <string>
     */
    public id(): string;

    /**
     * Renders or re-renders the Component. That is, applies the Component's associated Component Type to this
     * Component and its DOM element.
     */
    public render(): Component;

}

/**
 * A Builder represents a component on the Page Builder. Rather than rendering content, it is used to expose
 * properties and allow configuration and customization.
 */
declare class Builder {
  public wrapper: {
    componentRenderer<a>(a: a): void;
    defaultStateGenerator(): void;
    propertiesRenderer<a, b>(a: a, b: b): void;
  };

  constructor(options: any);
}

interface SkuidStatic {
  $: JQueryStatic;

  builder: {
    /**
     * NOTE: Not defined in API docs
     */
    getBuilders: () => Builder

    /**
     * This is the core API for interacting with the Skuid Page Composer, particularly for creating custom component
     * Builders.
     */
    core: {
      /**
       * Registers a Component Builder with the Page Composer. Registering a Builder adds it to the Component List
       * and enables the Page Composer to recognize XML elements associated with the Builder.
       */
      registerBuilder: (
        // The Builder to add to a list of Builders available for use on the Page Composer
        builder: Builder

      ) => void;

    }

  };

  component: {

    Component: typeof Component;

    /**
     * Creates and registers a new component.Component by looking for a registered componentType of the given
     * name and, if one exists, applying it to the DOM element provided. If the name is not recognized, returns an
     * error message.
     */
    factory: (options: {
      /**
       * Optional. The (optionally jQuery-wrapped) DOM element to which the component will be applied. If not
       * provided, a DOM element will be created in memory, meaning the component will exist in the background and
       * not be visible on the page.
       *
       * NOTE: Either definition or type must be defined, or the component will not be rendered and an error
       * message will be returned. Note that some standard Skuid Components expect an XML definition and may
       * produce errors if given only a type name.
       */
      element?: HTMLElement | JQuery;

      /**
       * Optional. An XML string or JS XMLDoc (optionally jQuery-wrapped) that specifies the component to be
       * rendered, including its properties. Typically generated with utils.makeXMLDoc(xmlString).
       */
      definition?: string | XMLDocument | JQuery;

      /**
       * Optional. The name of the registered component. If not provided, the component name will be extracted
       * from definition.
       */
      type?: string;

    }) => Component | string;

  };

  componentType: {

    register: <T>(

      // The name of the registered Component Type, e.g. "fieldeditor", "barchart", "calendar"
      typeName: string,

      // A function that "initializes" or "constructs" an instance of the Component.
      typeDefinition: <T>(

        /**
         * (jQuery-wrapped DOM element): The root/parent element for the new Component. (This element may or may
         * not be attached to the DOM.)
         */
        element: JQuery,

        // JQuery-wrapped JS XMLDoc
        xmlDefinition: JQuery,

        // A Component instance for your typeDefinition function to interact with
        component: Component

      ) => T

    ) => void;

  };

  /**
   * The page object returns information about the current page that is being viewed.
   *
   * NOTE: There are quite a few more properties visible on this object than defined in the API. If you add a
   * property that isn't in the API docs, include a note in that property's comment indicating so.
   */
  page: {

    // Indicates whether the current user can edit this page.
    editable: boolean;

    // The force.com id for this page.
    id: string;

    // The name of the current page.
    name: string;

    // NOTE: params is not defined by the page API docs
    params: {

      id: string;

      mode: string;

      previousActivityId: string;

      previousActivityType: string;

      editor: Editor;

    };

  };

  events: {

    subscribe: <T>(

      /**
       * The name of the event that you are publishing. We recommend namespacing your event names to prevent
       * conflicts, e.g. "acme.chart.refresh" instead of "chartRefresh"
       */
      event: string,

      /**
       * A function to call whenever the specified event is published. Depending on the event type, this function
       * may be passed a single argument containing additional data about the event.
       */
      callback: (data: T) => void

    ) => void;

    publish: <T>(

      /**
       * The name of the event that you are publishing. We recommend namespacing your event names to prevent
       * conflicts, e.g. "acme.chart.refresh" instead of "chartRefresh"
       */
      event: string,

      /**
       * (Optional) A JavaScript Array containing any additional data that you want to provide to subscribers when
       * your event is published. The items in the Array will become arguments passed in to functions that have
       * subscribed to this event. We recommend that your Array contain only one item, and that this item be a
       * JavaScript object.
       */
      data?: T[]

    ) => void;

  };

  label: {

    // Returns the custom label named labelName, (optionally) returning defaultValue if no such label exists
    read: (

      // The name of the label
      labelName: string,

      // A value to return if the label name is not recognized can be found
      defaultValue: string

    ) => string;

  };

  mobile: boolean;

  model: {

    Model: typeof Model;

    /**
     * Returns the model.Model registered under the given id.
     */
    getModel: (

      // The Id of a Model, as defined in the Page Composer.
      modelId: string

    ) => Model | void;

    /**
     * Returns a simple object map of Model Ids (as properties) to Models (as values of those properties).
     */
    map: () => { [modelId: string]: Model }[];

    /**
     * Sends all changes for the given Models to the server.
     */
    save: (

      // The array of Models from which to send changes to the server
      models: Model[],

      /**
       * A function, accepting one argument. Skuid will call this function when the save operation is complete and
       * will pass it an object
       */
      options?: {
        callback?<r>(result: Result): r;

        /**
         * NOTE: This is not defined in the API docs
         */
        initiatorId?: number;
      }

    ) => JQueryPromise<Result>;

    updateData: (

      models: Model[],

      callback?: <a>(result: Result) => a

    ) => JQueryPromise<Result>;

    /**
     * NOTE: Not defined in API docs.
     *
     * This is an asynchronous method that requires going to the server. It populates all object and field metadata
     * needed for the requested object and fields on this model, and then performs a query on the Model (if
     * requested) and creates default rows (if requested). load ordinarily should only be called once on a Model ---
     * subsequent queries should be made using updateData, so that metadata is not re-retrieved unnecessarily.
     */
    load: <T>(

      // An array of skuid Models that have already been initialized and registered.
      models: Model[]

    ) => JQueryPromise<T>;

  };

  /**
   * Salesforce Date and DateTime strings are always expressed using UTC and follow these formatting conventions:
   *
   * Dates: yyyy-MM-dd
   * DateTimes: yyyy-MM-dd'T'HH:mm:ss [ .SSSZ ]
   * Though the Apex primitive DateTime supports milliseconds (and thus they are included in Salesforce DateTime
   * strings), the milliseconds portion of the DateTime is reset to ".000" when the value is stored in the database.
   * Skuid will, likewise, discard milliseconds when converting to and from JavaScript Dates. For this reason, the
   * millisecond portion of the string will always be included when the string is generated by Skuid, but will be
   * ignored if provided as an input.
   *
   * In addition, Skuid does not support arbitrary time zone conversions. All Salesforce DateTime strings are assumed
   * to be using UTC ("+0000"). If another time zone is specified, it will be ignored and the date will be parsed as
   * if it were in UTC. Skuid will, however, perform the proper conversion between UTC and the user's local time when
   * converting JavaScript dates to/from Salesforce DateTime strings.
   *
   * (The date formats above conform to the Java Simple Date Format)
   */
  time: {

    /**
     * An array of containing the lowercase AM and PM markers localized according to the running user's language
     * setting or the designated language for the page. For example, if the running user's language is "en-US", this
     * array will be ["am","pm"]. Skuid only ships with AM and PM markers in English - but you can add translations
     * for any other languages you need by going to Setup > Custom Labels, and searching for the Custom Label
     * included in the Skuid namespace called "AM PM Markers".
     */
    amPm: string[];

    /**
     * An array of full-length day name Strings, localized according to the running user's language setting or the
     * designated language for the page. For example, if the running user's language is "en-US", this array will be
     * ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]. Skuid ships with localized
     * full-length day names for English, Spanish, French, and Swedish - but you can add translations for any other
     * languages you need by going to Setup > Custom Labels, and searching for the Custom Label included in the
     * Skuid namespace called "Day Names Long".
     */
    dayNames: string[];

    /**
     * An array of 2-character day name Strings, localized according to the running user's language setting or the
     * designated language for the page. For example, if the running user's language is "en-US", this array will be
     * ["Su","Mo","Tu","We","Th","Fr","Sa"]. Skuid ships with localized 2-character day names for English, Spanish,
     * French, and Swedish - but you can add translations for any other languages you need by going to Setup >
     * Custom Labels, and searching for the Custom Label included in the Skuid namespace called "Day Names Min".
     */
    dayNamesMin: string[];

    /**
     * An array of 3-character day name Strings, localized according to the running user's language setting or the
     * designated language for the page. For example, if the running user's language is "en-US", this array will be
     * ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]. Skuid ships with localized 3-character day names for English,
     * Spanish, French, and Swedish - but you can add translations for any other languages you need by going to
     * Setup > Custom Labels, and searching for the Custom Label included in the Skuid namespace called "Day Names
     * Short".
     */
    dayNamesShort: string[];

    /**
     * An array of month name Strings, localized according to the running user's language setting or the designated
     * language for the page. For example, if the running user's language is "en-US", this array will be
     * ["January","February", ... , "December"]. Skuid ships with localized month names for English, Spanish,
     * French, and Swedish - but you can add translations for any other languages you need by going to Setup >
     * Custom Labels, and searching for the Custom Label included in the Skuid namespace called "Month Names Long".
     */
    monthNames: string[];

    /**
     * An array of abbreviated month name Strings, localized according to the running user's language setting or the
     * designated language for the page. For example, if the running user's language is "en-US", this array will be
     * ["Jan","Feb", ... , "Dec"]. Skuid ships with localized abbreviated month names for English, Spanish, French,
     * and Swedish - but you can add translations for any other languages you need by going to Setup > Custom
     * Labels, and searching for the Custom Label included in the Skuid namespace called "Month Names Short".
     */
    monthNamesShort: string[];

    /**
     * Formats a JavaScript Date object (jsDate) into a string value, according to a designated date format.
     *
     * formatString can include any of the following date format pattern characters, as well as any desired
     * separator characters.
     *
     * The formatting algorithm is jQuery's $.datepicker.formatDate(), whose format characters are based on Java's
     * SimpleDateFormat.
     *
     * DATE FORMAT PATTERN CHARACTERS:
     * d - day of month (no leading zero)
     * dd - day of month (two digit)
     * o - day of the year (no leading zeros)
     * oo - day of the year (three digit)
     * D - day name short
     * DD - day name long
     * m - month of year (no leading zero)
     * mm - month of year (two digit)
     * M - month name short
     * MM - month name long
     * y - year (two digit)
     * yy - year (four digit)
     */
    formatDate: (formatString: string, jsDate: Date) => string;

    /**
     * Formats a JavaScript Date object (jsDate) into a string value, according to a designated time format.
     *
     * formatString can include any of the following time format pattern characters, as well as any desired
     * separator characters.
     *
     * The format characters are based on Java's SimpleDateFormat.
     *
     * TIME FORMAT PATTERN CHARACTERS:
     * a - Am/pm marker, localized according to running user's locale
     * s - second(s) in minute
     * m - minute in hour
     * H - hour in day (0-23)
     * k - hour in day (1-24)
     * h - hour in am/pm (1-12)
     * K -	hour in am/pm (0-11)
     * mm, hh, HH, kk, KK will result in leading zeros being prepended if the result is less than 10
     */
    formatTime: (formatString: string, jsDate: Date) => string;

    /**
     * Use this function to offset your date by the amount that the Salesforce user timezone setting and the user's
     * device timezone differ.  When you use this function, your date will now be "wrong" if you output it into the
     * console.  This is because after applying this function, the timezone will not change, but the actual date and
     * time will be offset.  In most cases, this function will return the exact same date that was input. To
     * reverse the result of this function, use the time.getRealJSDateTimeFromLocal(jsDate) function.
     */
    getLocalDateTime: (jsDate: Date) => Date;

    /**
     * Use this function to reverse the effects of the time.getLocalDateTime(jsDate) function.
     */
    getRealJSDateTimeFromLocal: (jsDate: Date) => Date;

    /**
     * Takes a JavaScript Date Object and converts it to a Salesforce Date string
     */
    getSFDate: (jsDate: Date) => string;

    /**
     * Takes a JavaScript Date object and converts it to a Salesforce DateTime string
     */
    getSFDateTime: (jsDate: Date) => string;

    /**
     * Takes a Salesforce Date string and formats it in the locale of the running Salesforce user
     */
    makeFormattedDate: (sfDate: string) => string;

    /**
     * Takes a JavaScript Date object and formats it in the locale of the running Salesforce user
     */
    makeFormattedDateFromJS: (jsDate: Date) => string;

    /**
     * Takes a salesforce Date object and converts it to a JS DateTime string
     */
    parseSFDate: (sfDate: string) => Date;

    /**
     * Takes a Salesforce DateTime string and converts it to a JavaScript Date object
     */
    parseSFDateTime: (sfDateTime: string) => Date;

  };

  ui: {

    Editor: typeof Editor;

    Field: typeof Field;

    Item: typeof Item;

  };

  /**
   * The utils object provides convenience methods for commonly used functionality in
   */
  utils: {

    // True if this Salesforce.com organization / environment has the Multi-Currency feature enabled.
    isMultiCurrencyOrganization: boolean;

    // The Id of the Salesforce.com organization / environment.
    organizationId: string;

    /**
     * An object containing various fields from the running user’s User object, including:
     *
     * -- defaultCurrency (e.g. “USD”)
     * -- firstName (e.g. “John”)
     * -- language (e.g. “en_GB”)
     * -- lastName (e.g. “Smith”)
     * -- locale (e.g. “fr_FR”)
     * -- name (e.g. “John Smith”)
     * -- profileId (the running User’s Profile’s Id)
     * -- userId (the running user’s Id)
     */
    userInfo: {

      defaultCurrency: string;
      firstName: string;
      language: string;
      lastName: string;
      locale: string;
      name: string;
      profileId: string;
      userId: string;

    };

    /**
     * An object containing various fields describing the running user’s Locale, including:
     *
     * -- dateFormat (e.g. “m/d/yy”, where “m” is month, “d” is day in month, “y” is the year. Use multiple to
     *    force prepending zeros, if possible, or the full year)
     * -- decimalsSeparator (the character used to distinguish the “decimal” part of a number from the integer
     *    part, e.g. ”.”)
     * -- defaultCurrency (the 3-digit ISO code of the locale’s default currency, e.g. “USD”)
     * -- firstDay (the integer index of the first day of the locale’s calendar week, with Sunday being 0)
     * -- isRTL (true if dates and time are written right-to-left in this locale)
     * -- localeName (e.g. “English (United States)”)
     * -- sfdcLocaleKey (the Salesforce.com key for this Locale - not always ISO, e.g. “en_US”)
     * -- showMonthAfterYear (true if the month should be shown after the year in datepickers)
     * -- showTimeBeforeDate (true if the time should be shown before the date in datepickers)
     * -- thousandsSeparator (the character used to separate every 3 integer digits in this locale, e.g. ”,”)
     * -- timeFormat (e.g. “h:mm a”, where “h” is hour, “m” is minute, “a” is the AM/PM indicator. Use multiple
     *    to force prepending zeros, if possible)
     */
    userLocale: {

      dateFormat: string;
      decimalsSeparator: string;
      defaultCurrency: string;
      firstDay: number;
      isRTL: boolean;
      localeName: string;
      sfdcLocaleKey: string;
      showMonthAfterYear: boolean;
      showTimeBeforeDate: boolean;
      thousandsSeparator: string;
      timeFormat: string;

    };

    /**
     * Converts a currency value from one ISO currency to another, based on the conversion rates defined in the
     * Salesforce.com organization. (Only available for Multi-Currency organizations)
     *
     * Returns the converted currency amount -or- the original value if one or both ISO codes were not
     * recognized or no currencies were defined for the current org or the current org does not support multiple
     * currencies.
     */
    convertCurrency: (

      // The currency amount to convert
      value: number,

      // The ISO code representing the currency in which value is expressed
      fromIsoCode: string,

      // The ISO code representing the desired currency
      toIsoCode: string

    ) => number;

    /**
     * Returns a jQuery object around a new jQuery UI Dialog / Popup box, which you could then run jQuery UI
     * Dialog methods on
     */
    createPopupFromPopupXML: <T>(

      /**
       * A jQuery object around the XML definition of a popup, such as would be created by Skuid using one of
       * the Popup Action types
       */
      popupXML: JQuery,

      /**
       * An optional JavaScript object providing Skuid with some context in which to create the popup --- for
       * instance, you might want to pass in a particular row here so that Skuid knows which row to render the
       * popup relative
       */
      context?: {

        row: T;

      }

    ) => JQuery;

    /**
     * Decodes html characters like &amp; into their actual character.
     *
     * Returns a decoded HTML string. For example, where "&amp;" and "&gt;" have been converted into "&" and
     * ">".
     */
    decodeHTML: (

      // An HTML string to decode.
      value: string

    ) => string;

    /**
     * A delayed on-change handler for an input element, which waits for a user to stop typing for 400
     * milliseconds before calling a callback function with the new and old values of the input element. The
     * purpose of this function is to improve the user experience of on-change handlers, such that logic is not
     * executed immediately upon a single change to a given field but rather only when a user "finishes" typing
     * temporarily.
     */
    delayInputCallback: (

      // A jQuery-wrapped input element to listen for changes on
      inputElement: JQuery,

      /**
       * A function that will be called after the user has stopped typing for 400 milliseconds, which will be
       * handed the new value and the old value as its first and second parameters, respectively.
       */
      callback: (newValue: string, oldValue: string) => void

    ) => void;

    /**
     * Encodes html characters like & into their encoded value like &amp;.
     *
     * Returns an HTML-encoded string where special characters have been escaped. For example, where "&" and ">"
     * have been converted into "&amp;" and "&gt;".
     *
     * @param value<string>
     *
     * @return <string>
     */
    encodeHTML: (

      // Any string value
      value: string

    ) => string;

    /**
     * Escapes single quotes in a string.
     *
     * Returns the input string where single quotes have been escaped with a backslash. For example, given the
     * input "O'Reailly", this function would return "O\'Reilly".
     *
     * @param value<string>
     *
     * @return <string>
     */
    escapeSingleQuotes: (

      // Any string value
      value: string

    ) => string;

    /**
     * Generates a Unique Identifier within a Skuid page.
     *
     * Returns a unique identifier within the current context.
     *
     * @return <string>
     */
    generateGUID: () => string;

    /**
     * Generates a URL to the raw attachment file. Useful for creating a download link or for displaying images
     * on the page.
     *
     * Returns a URL for the attachment. Useful for downloading content or displaying images within an IMG tag.
     * The format typically looks something like this: /servlet/servlet.FileDownload?file=<18-character ID>
     *
     * @param attachmentId<string>
     *
     * @return <string>
     */
    getUrlFromAttachmentId: (

      // A Salesforce 18-character Attachment Id
      attachmentId: string

    ) => string;

    /**
     * Returns an XMLDocument from a xml template string.
     *
     * @param xmlTemplateString<string>
     *
     * @return <XMLDocument>
     */
    makeXMLDoc: (xmlTemplateString: string) => XMLDocument;

    /**
     * Evaluates a Skuid merge template, using Skuid's Template syntax, in the desired mode.
     */
    merge: <T>(

      /**
       * Must be one of the following values:
       * -- "global" - no specific Model or Row context is expected
       * -- "model" - a specific Model context is expected, but not a Row
       * -- "row" - a specific Model and Row context is expected
       */
      mode: string,

      /**
       * A Skuid Template. For more information about Skuid-specific template syntax, see Template Syntax /
       * Merge API
       */
      template: string,

      /**
       * Optional. A simple object with any of the following properties:
       * -- nl2br (boolean): Optional, defaults to true. If set to false, prevents conversion of new line
       *    characters to HTML line break tags.
       * -- createFields (boolean): Optional, defaults to true. If true, Skuid will create ui.Fields if
       *    the merge method is "row" and field level merges, e.g. {{FirstName}} {{LastName}}, are
       *    encountered.
       */
      options?: {

        nl2br?: boolean;

        createFields?: boolean;

      },

      // Optional. The Model to use when resolving the template in "model" mode.
      model?: Model,

      /**
       * Optional. A simple row object to use when resolving the template in "row" mode. Can be obtained via a
       * model.Model object's getRowById() function or, simply, via the data property.
       */
      row?: T

    ) => JQuery;

    /**
     * Evaluates a Skuid merge template, using Skuid's Template syntax, in the desired mode.
     */
    mergeAsText: <T>(


      /**
       * Must be one of the following values:
       * -- "global" - no specific Model or Row context is expected
       * -- "model" - a specific Model context is expected, but not a Row
       * -- "row" - a specific Model and Row context is expected
       */
      mode: string,

      /**
       * A Skuid Template. For more information about Skuid-specific template syntax, see Template Syntax /
       * Merge API
       */
      template: string,

      /**
       * Optional. A simple object with any of the following properties:
       * -- createFields (boolean): Optional, defaults to true. If true, Skuid will create ui.Fields if
       *    the merge method is "row" and field level merges, e.g. {{FirstName}} {{LastName}}, are
       *    encountered.
       */
      options?: {

        createFields?: boolean;

      },

      // Optional. The Model to use when resolving the template in "model" mode.
      model?: Model,

      /**
       * Optional. A simple row object to use when resolving the template in "row" mode. Can be obtained via a
       * model.Model object's getRowById() function or, simply, via the data property.
       */
      row?: T

    ) => string;

    /**
     * Evaluates a Skuid merge template, using Skuid's Template syntax, using whatever model and/or row context
     * is provided.
     *
     * The mode used for the merge is determined automatically by the presence of model and/or row properties in
     * the optional context object - if model is provided and resolves to a valid Skuid Model, then the merge
     * mode will be "model", and if a row is provided, then the merge mode will be "row", but if neither "model"
     * or "row" is provided then the mode will be "global".
     *
     * Returns a text string containing the result of the merge.
     *
     * @param template<string>
     * @param context<{ model<model.Model>, row<any> }>
     * @param mergeSettings<{ createFields<boolean> }>
     *
     * @return <string>
     */
    mergeAsTextInContext: <T>(

      /**
       * A Skuid Template. For more information about Skuid-specific template syntax, see Template Syntax /
       * Merge API
       */
      template: string,

      // Optional. A simple object with any of the following properties:
      context?: {

        // Optional. The Model to use when resolving the template in "model" mode.
        model?: Model;

        /**
         * Optional. A simple row object to use when resolving the template in "row" mode. Can be obtained
         * via a model.Model object's getRowById ( ) or getRows( ) methods.
         */
        row?: T;

      },

      /**
       * Optional. A simple object with any of the following properties:
       */
      mergeSettings?: {

        /**
         * Optional, defaults to true. If true, Skuid will create ui.Fields if the merge method is
         * "row" and field level merges, e.g. {{FirstName}} {{LastName}}, are encountered. The HTML elements
         * generated for these fields will be converted to text.
         */
        createFields?: boolean;

      }

    ) => string;

  };

}

declare var skuid: SkuidStatic;
declare module "skuid" {
  export = skuid;
}
