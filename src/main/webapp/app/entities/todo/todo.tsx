import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITodo } from 'app/shared/model/todo.model';
import { getEntities } from './todo.reducer';

export const Todo = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const todoList = useAppSelector(state => state.todo.entities);
  const loading = useAppSelector(state => state.todo.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="todo-heading" data-cy="TodoHeading">
        <Translate contentKey="todosApp.todo.home.title">Todos</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="todosApp.todo.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/todo/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="todosApp.todo.home.createLabel">Create new Todo</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {todoList && todoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="todosApp.todo.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="todosApp.todo.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="todosApp.todo.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="todosApp.todo.createdAt">Created At</Translate>
                </th>
                <th>
                  <Translate contentKey="todosApp.todo.updatedAt">Updated At</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {todoList.map((todo, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/todo/${todo.id}`} color="link" size="sm">
                      {todo.id}
                    </Button>
                  </td>
                  <td>{todo.name}</td>
                  <td>{todo.description}</td>
                  <td>{todo.createdAt ? <TextFormat type="date" value={todo.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{todo.updatedAt ? <TextFormat type="date" value={todo.updatedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/todo/${todo.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/todo/${todo.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/todo/${todo.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="todosApp.todo.home.notFound">No Todos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Todo;
