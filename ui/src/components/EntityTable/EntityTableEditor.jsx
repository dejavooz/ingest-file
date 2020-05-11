import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { TableEditor } from '@alephdata/vislib';
import { selectModel } from 'src/selectors';
import queryString from 'query-string';
import entityEditorWrapper from 'src/components/Entity/entityEditorWrapper';
import getEntityLink from 'src/util/getEntityLink';

import './EntityTableEditor.scss';

class EntityTableEditor extends Component {
  onEntityClick = (entity) => {
    if (entity) {
      const { history } = this.props;
      const pathname = getEntityLink(entity);
      history.push({ pathname });
    }
  }

  render() {
    const { collection, entities, entityManager, isPending, model, sort, sortColumn, schema, selection, updateSelection } = this.props;

    if (!schema) {
      return null;
    }

    const trimmedSort = sort?.field
      ? {
        field: sort.field.replace('properties.', ''),
        direction: sort.direction,
      } : sort;

    console.log(schema);

    return (
      <TableEditor
        entities={entities}
        schema={model.getSchema(schema)}
        entityManager={entityManager}
        sort={trimmedSort}
        sortColumn={newField => sortColumn(`properties.${newField}`)}
        selection={selection}
        updateSelection={updateSelection}
        writeable={collection?.writeable}
        isPending={isPending}
        visitEntity={this.onEntityClick}
      />
    );
  }
}

export default compose(
  withRouter,
  entityEditorWrapper,
)(EntityTableEditor);
