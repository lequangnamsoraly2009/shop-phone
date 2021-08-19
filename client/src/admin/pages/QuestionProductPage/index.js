import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import MainQuestionProduct from "./components/mainQuestion";


function QuestionProductPage() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={MainQuestionProduct} />
    </Switch>
  );
}

export default QuestionProductPage;
